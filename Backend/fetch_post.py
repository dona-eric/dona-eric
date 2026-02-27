"""
FeedService
───────────
• Medium   → RSS auto-fetch   (https://medium.com/feed/@username)
• LinkedIn → JSON manuel      (data/linkedin_posts.json)

Scoring : views×0.40 + likes×0.30 + freshness×0.20 + comments×0.10
Cache   : TTL 6h
"""

import asyncio
import json
import re
import time
from pathlib import Path
import httpx
import feedparser
from services.cache_service import CacheService

# ── Config ────────────────────────────────────────────────────────────────────
MEDIUM_USERNAME    = "koulodjiric"
LINKEDIN_JSON_PATH = Path(__file__).parent.parent / "data" / "linkedin_posts.json"

W_VIEWS    = 0.40
W_LIKES    = 0.30
W_FRESH    = 0.20
W_COMMENTS = 0.10

FRESHNESS_WINDOW_DAYS = 90
# ─────────────────────────────────────────────────────────────────────────────


class FeedService:
    def __init__(self, cache: CacheService):
        self.cache = cache

    # ── Public ────────────────────────────────────────────────────────────────

    async def get_posts(self, source: str = "all", min_score: float = 0.0) -> list[dict]:
        posts = self.cache.get("posts")
        if posts is None:
            posts = await self.refresh_all()
        if source != "all":
            posts = [p for p in posts if p["source"] == source]
        if min_score > 0:
            posts = [p for p in posts if p["score"] >= min_score]
        return posts

    async def refresh_all(self, force: bool = False) -> list[dict]:
        if not force:
            cached = self.cache.get("posts")
            if cached is not None:
                return cached

        medium_posts   = await self._fetch_medium()
        linkedin_posts = self._load_linkedin_json()

        all_posts = medium_posts + linkedin_posts
        all_posts = self._normalise_scores(all_posts)
        all_posts.sort(key=lambda p: p["score"], reverse=True)

        self.cache.set("posts", all_posts)
        return all_posts

    # ── Medium RSS ────────────────────────────────────────────────────────────

    async def _fetch_medium(self) -> list[dict]:
        url = f"https://medium.com/feed/@{MEDIUM_USERNAME}"
        try:
            async with httpx.AsyncClient(timeout=15) as client:
                resp = await client.get(url, follow_redirects=True)
                resp.raise_for_status()
                raw = resp.text
        except Exception as e:
            print(f"[Medium] fetch error: {e}")
            return []

        feed  = feedparser.parse(raw)
        posts = []

        for entry in feed.entries:
            claps    = self._extract_medium_claps(entry)
            comments = int(getattr(entry, "slash_comments", 0))
            pub_date = self._parse_date(
                getattr(entry, "published", None) or getattr(entry, "updated", None)
            )
            excerpt = self._strip_html(getattr(entry, "summary", ""))[:160]
            tags    = [t.term for t in getattr(entry, "tags", [])][:5]

            posts.append({
                "id":       entry.get("id", entry.link),
                "title":    entry.title,
                "excerpt":  excerpt,
                "url":      entry.link,
                "source":   "medium",
                "pub_date": pub_date,
                "tags":     tags,
                "raw_metrics": {"views": 0, "likes": claps, "comments": comments},
                "score":    0,
            })

        return posts

    # ── LinkedIn JSON ─────────────────────────────────────────────────────────

    def _load_linkedin_json(self) -> list[dict]:
        """
        Reads data/linkedin_posts.json.
        Each time you publish a LinkedIn post, add one entry to the JSON.
        (Copy URL + paste metrics from LinkedIn Analytics — ~30 seconds)
        """
        if not LINKEDIN_JSON_PATH.exists():
            print(f"[LinkedIn] JSON not found at {LINKEDIN_JSON_PATH}")
            return []
        try:
            raw = json.loads(LINKEDIN_JSON_PATH.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"[LinkedIn] JSON parse error: {e}")
            return []

        posts = []
        for item in raw:
            if not all(k in item for k in ("id", "title", "url", "date")):
                print(f"[LinkedIn] skipping malformed entry: {item.get('id','?')}")
                continue
            m = item.get("metrics", {})
            posts.append({
                "id":       item["id"],
                "title":    item["title"],
                "excerpt":  item.get("excerpt", "")[:160],
                "url":      item["url"],
                "source":   "linkedin",
                "pub_date": self._parse_date(item["date"]),
                "tags":     item.get("tags", [])[:5],
                "raw_metrics": {
                    "views":    int(m.get("views",    0)),
                    "likes":    int(m.get("likes",    0)),
                    "comments": int(m.get("comments", 0)),
                },
                "score": 0,
            })
        return posts

    # ── Scoring ───────────────────────────────────────────────────────────────

    def _normalise_scores(self, posts: list[dict]) -> list[dict]:
        if not posts:
            return posts

        max_views    = max((p["raw_metrics"]["views"]    for p in posts), default=1) or 1
        max_likes    = max((p["raw_metrics"]["likes"]    for p in posts), default=1) or 1
        max_comments = max((p["raw_metrics"]["comments"] for p in posts), default=1) or 1
        now          = time.time()
        window       = FRESHNESS_WINDOW_DAYS * 86400

        for p in posts:
            m = p["raw_metrics"]
            v = m["views"]    / max_views
            l = m["likes"]    / max_likes
            c = m["comments"] / max_comments
            f = max(0.0, 1.0 - ((now - p["pub_date"]) / window))
            p["score"] = round(
                (W_VIEWS * v + W_LIKES * l + W_FRESH * f + W_COMMENTS * c) * 100, 1
            )
        return posts

    # ── Helpers ───────────────────────────────────────────────────────────────

    @staticmethod
    def _strip_html(text: str) -> str:
        return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", text)).strip()

    @staticmethod
    def _parse_date(value) -> float:
        if not value:
            return time.time()
        try:
            from dateutil import parser as du
            return du.parse(str(value)).timestamp()
        except Exception:
            return time.time()

    @staticmethod
    def _extract_medium_claps(entry) -> int:
        for attr in ("media_starrating", "starrating"):
            val = getattr(entry, attr, None)
            if isinstance(val, dict):
                return int(val.get("count", 0))
        return 0
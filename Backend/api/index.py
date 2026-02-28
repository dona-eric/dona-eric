"""
Blog Feed Aggregator — FastAPI Backend
Fetches articles from Medium RSS + LinkedIn RSS,
scores them, caches results, exposes /api/posts
"""

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
from fetch_post import FeedService
from redis_cache import CacheService


cache = CacheService(ttl_seconds=21600)   
feed  = FeedService(cache)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Warm cache on startup
    asyncio.create_task(feed.refresh_all())
    yield

app = FastAPI(
    title="Blog Feed API",
    description="Auto-aggregated tech articles from Medium & LinkedIn",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://donerick.vercel.app"]
    allow_methods=["GET","POST"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/api/posts")
async def get_posts(
    limit:    int   = Query(default=10, ge=1, le=50),
    source:   str   = Query(default="all", pattern="^(all|medium|linkedin)$"),
    min_score: float = Query(default=0.0),
):
    """
    Returns scored & sorted articles.
    sort order: views × 0.40 + likes × 0.30 + freshness × 0.20 + comments × 0.10
    """
    posts = await feed.get_posts(source=source, min_score=min_score)
    return {
        "total": len(posts),
        "posts": posts[:limit],
        "cached_at": cache.last_updated("posts"),
    }


@app.post("/api/refresh")
async def force_refresh():
    """Force a cache refresh (protect with API key in prod)."""
    await feed.refresh_all(force=True)
    return {"status": "refreshed"}


@app.get("/api/health")
async def health():
    return {"status": "ok", "cache_keys": cache.size()}
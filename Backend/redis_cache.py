"""
Simple in-memory cache with TTL.
In production, swap for Redis (pip install redis).
"""

import time
from typing import Any, Optional


class CacheService:
    def __init__(self, ttl_seconds: int = 21600):
        self._store: dict[str, dict] = {}
        self.ttl = ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        entry = self._store.get(key)
        if not entry:
            return None
        if time.time() - entry["ts"] > self.ttl:
            del self._store[key]
            return None
        return entry["data"]

    def set(self, key: str, data: Any) -> None:
        self._store[key] = {"data": data, "ts": time.time()}

    def last_updated(self, key: str) -> Optional[str]:
        entry = self._store.get(key)
        if not entry:
            return None
        import datetime
        return datetime.datetime.fromtimestamp(entry["ts"]).isoformat()

    def size(self) -> int:
        return len(self._store)

    def clear(self) -> None:
        self._store.clear()
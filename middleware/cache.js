const TTL_MS = 60 * 1000; // 1 minute

// key -> { data, createdAt }
const cache = new Map();

const isExpired = (entry) => Date.now() - entry.createdAt > TTL_MS;

// Caching for GET requests
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const entry = cache.get(key);

  if (entry && !isExpired(entry)) {
    res.set("X-Cache", "HIT");
    return res.json(entry.data);
  }

  // Expired entries are never used: remove them, then fetch fresh data
  if (entry) cache.delete(key);

  res.set("X-Cache", "MISS");

  // Intercept res.json so the fresh response is stored in the cache
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode === 200) {
      cache.set(key, { data: body, createdAt: Date.now() });
    }
    return originalJson(body);
  };

  next();
};

// For POST / PUT / PATCH / DELETE: clear the cache once the write succeeds
const invalidateCacheMiddleware = (req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.clear(); // clears /products and every /products/:id
      console.log("[CACHE] Invalidated after", req.method, req.originalUrl);
    }
  });
  next();
};

module.exports = { cacheMiddleware, invalidateCacheMiddleware };

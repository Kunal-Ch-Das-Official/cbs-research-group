const NodeCache = require('node-cache');

// Initialize cache without TTL
const cache = new NodeCache();

// Middleware to check and use cache
function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const cachedData = cache.get(key);

  if (cachedData) {
    // Send cached data if available
    return res.json(cachedData);
  } else {
    // Proceed to the next middleware or route handler if not cached
    res.sendCachedData = (data) => {
      // Cache the data before sending the response
      cache.set(key, data);
      res.json(data);
    };

    // Ensure to call next() and return a promise to avoid the lint error
    return next();
  }
}

// Function to clear the cache for a specific key
function clearCache(key) {
  cache.del(key);
}

module.exports = { cacheMiddleware, clearCache };

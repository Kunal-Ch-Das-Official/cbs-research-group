/**
 * Cache Control Middleware
 * Project: CBS-Research-Group-Backend
 * Author: Kunal Chandra Das
 * Date: 24/08/2024
 *
 * Description:
 * This middleware handles caching for GET requests in the CBS Research Group backend.
 * It stores responses for frequently accessed resources, reducing server load and improving
 * response times for subsequent requests. The middleware checks for cached data before
 * processing a request and serves the cached response if available.
 *
 * Usage:
 * Apply this middleware to routes where caching of GET requests is beneficial.
 * It can be configured to set custom cache expiration times or to clear the cache
 * when new data is uploaded, updated, or deleted.
 */

const NodeCache = require("node-cache");

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
    next();
  }
}

// Function to clear the cache for a specific key
function clearCache(key) {
  cache.del(key);
}

module.exports = { cacheMiddleware, clearCache };

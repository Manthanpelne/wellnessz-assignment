const redisClient = require('../config/redis');

exports.aiRateLimiter = async (req, res, next) => {
  const userId = req.user._id; // Get the logged-in coach's ID
  const key = `ai-limit:${userId}`;

  try {
    const requests = await redisClient.incr(key);

    if (requests === 1) {
      // Setting expiry for 1 hour
      await redisClient.expire(key, 3600);
    }

  if (requests > 5) {
  const ttl = await redisClient.ttl(key); // Get remaining seconds
  const minutes = Math.ceil(ttl / 60);
  
  return res.status(429).json({ 
    message: `Hourly AI limit reached. Please try again in ${minutes} minutes.`,
    retryAfter: ttl
  });
}
    next();
  } catch (error) {
    console.log("redis error", error)
    next(); 
  }
};
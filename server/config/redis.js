const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', err => console.error('❌ Redis Cloud Error:', err));
redisClient.on('connect', () => console.log('🚀 Connecting to Redis Cloud...'));
redisClient.on('ready', () => console.log('✅ Connected to Redis Cloud Successfully'));

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('❌ Failed to connect to Redis Cloud:', err);
    }
})();

module.exports = redisClient;
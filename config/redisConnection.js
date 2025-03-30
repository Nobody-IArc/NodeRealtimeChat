const Redis = require('ioredis');

const redisConnect = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
});

redisConnect.on('connect', () => {
    console.log('Redis 연결 성공');
});

redisConnect.on('error', err => {
    console.error('Redis 연결 오류', err.message);
});

module.exports = redisConnect;

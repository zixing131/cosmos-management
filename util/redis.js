import Redis from 'ioredis';
import * as config from '../config/default';

const redisConfig = config.redis;

module.exports = new Redis({
  port: redisConfig.PORT,          // Redis port
  host: redisConfig.HOST,   // Redis host
  family: redisConfig.FAMILY,           // 4 (IPv4) or 6 (IPv6)
  password: redisConfig.PASSWORD
});


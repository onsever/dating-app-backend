import RedisCache from "@redis/redis.cache";

export default class Redis extends RedisCache {
    private static readonly CACHE_NAME: string = 'redisConnection';

    constructor() {
        super(Redis.CACHE_NAME);
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect();
        } catch (error) {
            this.logger.error(`Error connecting to Redis: ${error}`);
        }
    }
}
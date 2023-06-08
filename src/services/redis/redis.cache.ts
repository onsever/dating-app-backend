import { createClient } from "redis";
import Logger from "@configurations/logger";
import Config from "@configurations/config";

export type RedisClient = ReturnType<typeof createClient>;

export default abstract class RedisCache {
    public client: RedisClient;
    protected readonly logger: Logger;

    protected constructor(cacheName: string) {
        this.client = createClient({
            url: Config.getInstance().REDIS_HOST
        });
        this.logger = new Logger(cacheName);
        this.errorHandler();
    }

    private errorHandler(): void {
        this.client.on('error', (error: unknown) => {
            this.logger.error(`Error connecting to the cache: ${error}`);
        })
    }
}
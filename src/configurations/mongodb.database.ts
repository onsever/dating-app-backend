import mongoose from 'mongoose';
import Logger from "@configurations/logger";
import Config from "@configurations/config";
import Redis from "@configurations/redis";
import IDatabase from "@interfaces/database.interface";

export default class MongodbDatabase implements IDatabase {
    private readonly config: Config;
    private readonly logger: Logger;
    private readonly redis: Redis;

    constructor() {
        this.config = Config.getInstance();
        this.logger = new Logger('mongodb.database.ts');
        this.redis = new Redis();
    }

    public connect(): void {
        mongoose.connect(`${this.config.DATABASE_CONNECTION_URL}`)
            .then(() => {
                this.logger.info('Successfully connected to database.');
                this.redis.connect().then(() => {
                    this.logger.info('Successfully connected to Redis.');
                }).catch((error) => {
                    this.logger.error(`Error connecting to Redis: ${error}`);
                });
            })
            .catch((error) => {
                this.logger.error(`Error connecting to the database: ${error}`);
                return process.exit(1);
            });
    }
}
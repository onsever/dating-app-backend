export default class Config {
    private static INSTANCE: Config;
    public readonly PORT: number;
    public readonly DATABASE_CONNECTION_URL: string;
    public readonly CLIENT_URL: string;
    public readonly REDIS_HOST: string;
    public readonly NODE_ENV: string;
    public readonly SECRET_KEY_ONE: string;
    public readonly SECRET_KEY_TWO: string;
    public readonly JWT_TOKEN: string;
    public readonly CLOUD_NAME: string;
    public readonly CLOUD_API_KEY: string;
    public readonly CLOUD_API_SECRET: string;

    private constructor() {
        this.PORT = Number(process.env.PORT) || 3000;
        this.DATABASE_CONNECTION_URL = process.env.DATABASE_CONNECTION_URL || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
        this.REDIS_HOST = process.env.REDIS_HOST || '';
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
        this.JWT_TOKEN = process.env.JWT_TOKEN || '';
        this.CLOUD_NAME = process.env.CLOUD_NAME || '';
        this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
        this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
    }

    public static getInstance(): Config {
        if (!Config.INSTANCE) {
            Config.INSTANCE = new Config();
        }

        return Config.INSTANCE;
    }

    public validate(): void {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`Configuration validation error: Missing environment variable ${key}.`);
            }
        }
    }
}
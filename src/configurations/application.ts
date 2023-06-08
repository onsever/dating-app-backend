import express, { Express } from 'express';
import Server from "@configurations/server";
import MongodbDatabase from "@configurations/mongodb.database";
import Config from "@configurations/config";
import IDatabase from "@interfaces/database.interface";

export default class Application {
    private readonly config: Config;
    private readonly app: Express;
    private readonly server: Server;
    private readonly database: IDatabase;

    constructor() {
        this.config = Config.getInstance();
        this.app = express();
        this.server = new Server(this.app);
        this.database = new MongodbDatabase();
    }

    public initialize(): void {
        this.config.validate();
        this.database.connect();
        this.server.start();
    }
}
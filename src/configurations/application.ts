import express, { Express } from 'express';
import Server from "@configurations/server";
import MongodbDatabase from "@configurations/mongodb.database";
import Config from "@configurations/config";
import IDatabase from "@interfaces/database.interface";
import Cloudinary from "@services/cloudinary";

export default class Application {
    private readonly config: Config;
    private readonly app: Express;
    private readonly server: Server;
    private readonly database: IDatabase;
    private readonly cloudinary: Cloudinary;

    constructor() {
        this.config = Config.getInstance();
        this.cloudinary = Cloudinary.getInstance();
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
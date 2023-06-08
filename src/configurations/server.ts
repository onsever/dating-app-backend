import { Application, json, urlencoded, Request, Response, NextFunction} from "express";
import 'express-async-errors';
import http from "http";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import cookieSession from "cookie-session";
import Config from "@configurations/config";
import Logger from "@configurations/logger";
import HTTP_STATUS from "http-status-codes";
import BullBoard from "@bull/bull.board";
import MainRouter from "@routes/main.router";
import IErrorResponse from "@interfaces/error.response.interface";
import CustomError from "@shared/errors/custom.error";

export default class Server {
    private readonly app: Application;
    private readonly config: Config;
    private readonly log: Logger;
    private readonly bullBoard: BullBoard;
    private mainRouter?: MainRouter;

    constructor(app: Application) {
        this.app = app;
        this.config = Config.getInstance();
        this.log = new Logger('server.ts');
        this.bullBoard = BullBoard.getInstance();
    }

    public start(): void {
        this.setupMiddlewares(this.app);
        this.setupApplicationRoutes(this.app);
        this.setupErrorHandler(this.app);
        this.setupServer(this.app);
    }

    private setupMiddlewares(app: Application): void {
        // Security Middlewares
        app.use(
            cookieSession({
                name: 'session',
                keys: [this.config.SECRET_KEY_ONE, this.config.SECRET_KEY_TWO],
                maxAge: 24 * 7 * 3600000, // 1 week for the JWT token. Deleted automatically.
                secure: this.config.NODE_ENV !== 'development'
            })
        );
        app.use(hpp());
        app.use(helmet());
        app.use(
            cors({
                origin: this.config.CLIENT_URL,
                credentials: true, // Cookies
                optionsSuccessStatus: HTTP_STATUS.OK,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
            })
        );

        // Other Middlewares
        app.use(compression());
        app.use(
            json({
                limit: '50mb'
            })
        );
        app.use(
            urlencoded({
                extended: true,
                limit: '50mb'
            })
        );
    }

    private setupApplicationRoutes(app: Application): void {
        app.use("/queues", this.bullBoard.getExpressAdapter().getRouter());
        this.mainRouter = MainRouter.getInstance(this.app);
    }

    private setupErrorHandler(app: Application): void {
        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND,
                message: `Can't find ${req.originalUrl} on this server!`
            });
        });

        app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
            this.log.error(`Error: ${error.message}`);

            if (error instanceof CustomError) {
                return res.status(error.statusCode).json(error.serializeErrors());
            }

            next();
        });
    }

    private setupServer(app: Application): void {
        const httpServer: http.Server = new http.Server(app);
        httpServer.listen(this.config.PORT, () => {
            this.log.info(`Server listening on port ${this.config.PORT}!`);
        }).on('error', (error: Error) => {
            this.log.error(`Error: ${error}`);
        });
    }
}
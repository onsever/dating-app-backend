import {Router, Request, Response, NextFunction, Application} from "express";
import Constants from "@shared/helpers/constants";

export default class MainRouter {
    private static INSTANCE: MainRouter;
    private readonly app: Application;

    private constructor(app: Application) {
        this.app = app;
    }

    public static getInstance(app: Application): MainRouter {
        if (!MainRouter.INSTANCE) {
            MainRouter.INSTANCE = new MainRouter(app);
        }
        return MainRouter.INSTANCE;
    }

    public addRoute(router: Router): void {
        this.app.use(Constants.BASE_API_URL, router);
    }

    public addRouteWithMiddleware(router: Router, middleware: (req: Request, res: Response, next: NextFunction) => void): void {
        this.app.use(Constants.BASE_API_URL, middleware, router);
    }
}
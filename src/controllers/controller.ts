import express, {Application, Router} from "express";
import MainRouter from "@routes/main.router";

export default abstract class Controller {
    protected readonly router: Router;
    protected readonly mainRouter: MainRouter;
    private readonly app: Application;

    protected constructor(app: Application) {
        this.app = app;
        this.router = express.Router();
        this.mainRouter = MainRouter.getInstance(app);
        this.mainRouter.addRoute(this.routes());
    }

    protected abstract routes(): Router;
}
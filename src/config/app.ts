import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { AppRoutes } from '../routes';

class App {

    public app: express.Application;
    private appRoutes: AppRoutes = new AppRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.appRoutes.route(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
    }
}

export default new App().app;
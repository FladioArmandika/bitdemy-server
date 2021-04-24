import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

import { AppRoutes } from '../routes';


class App {

    public app: express.Application;
    private appRoutes: AppRoutes = new AppRoutes();

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.mongoSetup();
        this.appRoutes.route(this.app);
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private mongoSetup(): void {
        mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bitdemy.0zi9u.mongodb.net/bitdemy?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        )
    }

}

export default new App().app;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes_1 = require("../routes");
class App {
    constructor() {
        this.appRoutes = new routes_1.AppRoutes();
        dotenv.config();
        this.app = express();
        this.config();
        this.mongoSetup();
        this.appRoutes.route(this.app);
    }
    config() {
        this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    mongoSetup() {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bitdemy.0zi9u.mongodb.net/bitdemy?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map
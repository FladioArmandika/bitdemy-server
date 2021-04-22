import { request, Request, Response, Router } from "express";
import AuthController from "../../controllers/auth";
import passport from "../../common/passport";
import * as jwt from 'jsonwebtoken'

export default class AuthRoutes {

    private authController: AuthController = new AuthController();

    public getRoutes() {
        const router: Router = Router();
        router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
        // router.get('/google/callback',
        //     passport.authenticate('google', {}),
        //     this.authController.authenticateCallback
        //     )
        router.get('/google/callback', this.authController.authenticateCallback)
        return router;
    }

}
import { Router } from "express";
import * as passport from "passport";
import AuthController from "../../controllers/auth";

export default class AuthRoutes {

    private authController: AuthController = new AuthController();

    public getRoutes() {
        const router: Router = Router();
        router.get('/google', passport.authenticate('google', { scope: ['profile','email'] } ));
        router.get('/google/callback',
            passport.authenticate('google', {}),
            this.authController.authenticateCallback
            )
        return router;
    }

}
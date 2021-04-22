import { NextFunction, Request, Response } from "express";
import { failureResponse } from "../common/service";
import passport from "../common/passport";
import JWTToken from "../common/jwttoken";
import * as url from 'url'

export default class AuthController {

    private jwtToken: JWTToken = new JWTToken();

    public authenticateCallback = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) { failureResponse("login failed", {}, res) }
            if (!user) { res.redirect('http://localhost:3000/login') }

            const token = this.jwtToken.generateAccessToken(user.id)

            res.cookie('token', token);
            res.redirect('http://localhost:3000/home')
        })(req, res, next);
    }

}
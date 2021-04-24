import { NextFunction, Request, Response } from "express";
import { failureResponse, mongoError, successResponse } from "../common/service";
import passport from "../common/passport";
import JWTToken from "../common/jwttoken";
import * as url from 'url'
import UserService from "../services/user";
import { Error } from "mongoose";
import { UserDocument } from "../models/user";

export default class AuthController {

    private jwtToken: JWTToken = new JWTToken();
    private userService: UserService = new UserService();

    public authenticateCallback = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) { failureResponse("login failed", {}, res) }
            if (!user) { res.redirect('http://localhost:3000/login') }

            this.userService.getUser({googleId: user.id}, (errGetUser: Error, userDoc: UserDocument) => {
                if (!errGetUser) {
                    const accessToken = this.jwtToken.generateAccessToken(userDoc)
                    // const refreshToken = this.jwtToken.generateRefreshToken(userDoc)

                    res.cookie('accessToken', accessToken, { httpOnly: true });
                    res.redirect('http://localhost:3000/login/success')
                }
            })
        })(req, res, next);
    }

}
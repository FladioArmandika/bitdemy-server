import { NextFunction, Request, Response } from "express";
import { failureResponse, insufficientParameters, mongoError, successResponse } from "../common/service";
import passport from "../common/passport";
import JWTToken from "../common/jwttoken";
import * as url from 'url'
import UserService from "../services/user";
import { Error } from "mongoose";
import { UserDocument } from "../models/user";
import * as jwt from "jsonwebtoken"

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

                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        maxAge: 60 * 1000 * 1000
                    });
                    res.redirect('http://localhost:3000/login/success')
                }
            })
        })(req, res, next);
    }

    public verifyUser = (req: Request, res: Response) => {

        if (req.cookies.accessToken) {
            const token = req.cookies.accessToken;
            jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    res.clearCookie('accessToken')
                    failureResponse('session expired', {}, res)
                } else {
                    successResponse('', decoded, res)
                }
            })
        } else {
            failureResponse('verify failed', {}, res)
        }
    }

}
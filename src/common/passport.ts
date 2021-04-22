import { Error } from "mongoose";
import * as passport from "passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import User, { UserDocument } from "../models/user";
import UserService from "../services/user";
import { mongoError } from "./service";


passport.serializeUser( (user, done) => {
    done(null, user);
})

passport.deserializeUser( (user, done) => {
    done(null, user);
})

passport.use(new Strategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    (request, accessToken: string, refreshToken: string,
        profile: Profile, callback: VerifyCallback) => {
        const userService: UserService = new UserService();

        userService.getUser({googleId: profile.id}, (error: Error, userData: UserDocument) => {
            if (error) {
                return callback(error, {})
            } else {
                if (userData) {
                    return callback(null, profile);
                } else {
                    // USER DOESN'T EXIST
                    const userNew: UserDocument = new User({
                        email: profile.emails[0].value,
                        name: profile.username,
                        googleId: profile.id,
                        profileUrl: profile.photos[0].value,
                    })

                    return userService.createUser(userNew, (userCreated: UserDocument) => {
                        if (userCreated) {
                            return callback(null, profile);
                        }
                    })
                }
            }
        })
    }
))

export default passport;

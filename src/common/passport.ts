import { Error } from "mongoose";
import * as passport from "passport";
import { Profile, Strategy } from "passport-google-oauth20";
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
        clientID: '',
        clientSecret: '',
        callbackURL: '',
    },
    (accessToken: string, refreshToken: string, 
        profile: Profile, callback: any) => {
        const userService: UserService = new UserService();

        userService.getUser({email: profile.emails[0]}, (error: Error, userData: UserDocument) => {
            if (error) {
                mongoError(error, callback);
            } else {
                if (userData) {
                    callback(null, profile);
                } else {
                    // USER DOESN'T EXIST
                    const userNew: UserDocument = new User({
                        email: profile.emails[0],
                        name: profile.name,
                    })

                    userService.createUser(userNew, (errorCreate: any, userCreated: UserDocument) => {
                        if (errorCreate) {
                            mongoError(errorCreate, callback);
                        } else {
                            callback(null, profile);
                        }
                    })
                }
            }
        })
    }
))
  
export default passport;

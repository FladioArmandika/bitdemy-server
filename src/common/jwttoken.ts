import * as jwt from "jsonwebtoken"
import { UserDocument } from "../models/user";


export default class JWTToken {

    public generateAccessToken = (user: UserDocument) => {
        const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        return token;
    }

    public generateRefreshToken = (user: UserDocument) => {
        const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
            expiresIn: '2d'
        })

        return token;
    }

}
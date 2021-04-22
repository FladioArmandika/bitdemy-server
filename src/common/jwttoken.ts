import * as jwt from "jsonwebtoken"


export default class JWTToken {

    public generateAccessToken = (googleId: string) => {
        const token = jwt.sign({ googleId }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        return token;
    }

}
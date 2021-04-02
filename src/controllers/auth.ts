import { Request, Response } from "express";

export default class AuthController {

    public authenticateCallback(req: Request, res: Response) {
        res.send(req.user)
    }

}
import { Request, Response } from "express";
import * as path from 'path';
export default class VideoController {

    public getVideo = (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname + '/../assets/sample.mp4'));
    }
}
import { Router } from "express";
import VideoController from "../../controllers/video";

export default class VideoRoutes {

    private videoController: VideoController = new VideoController();

    public getRoutes(): Router {
        const router: Router = Router();
        router.get('/', this.videoController.getVideo);

        return router;
    }

}
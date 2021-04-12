import { Router } from "express";
import VideoController from "../../controllers/video";

export default class VideoRoutes {

    private videoController: VideoController = new VideoController();

    public getRoutes = (): Router => {
        const router: Router = Router();

        router.get('/', this.videoController.getVideo);
        router.get('/stream', this.videoController.streamVideo);
        router.post('/', this.videoController.createVideo);
        router.delete('/', this.videoController.deleteVideo);
        router.put('/', this.videoController.updateVideo);

        return router;
    }

}
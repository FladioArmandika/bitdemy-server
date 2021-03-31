import { Application } from "express";
import VideoRoutes from "./api/video";

export class AppRoutes {

    private videoRoutes: VideoRoutes = new VideoRoutes();

    public route(app: Application) {
        app.use('/video', this.videoRoutes.getRoutes());
    }

}
import { Application } from "express";
import AuthRoutes from "./api/auth";
import VideoRoutes from "./api/video";

export class AppRoutes {

    private authRoutes: AuthRoutes = new AuthRoutes();
    private videoRoutes: VideoRoutes = new VideoRoutes();

    public route(app: Application) {
        app.use('/auth', this.authRoutes.getRoutes());
        app.use('/video', this.videoRoutes.getRoutes());
    }

}
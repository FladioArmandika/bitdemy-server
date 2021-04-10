import { Application } from "express";
import AuthRoutes from "./api/auth";
import CourseRoutes from "./api/course";
import VideoRoutes from "./api/video";

export class AppRoutes {

    private authRoutes: AuthRoutes = new AuthRoutes();
    private videoRoutes: VideoRoutes = new VideoRoutes();
    private courseRoutes: CourseRoutes = new CourseRoutes();

    public route(app: Application) {
        app.use('/auth', this.authRoutes.getRoutes());
        app.use('/video', this.videoRoutes.getRoutes());
        app.use('/course', this.courseRoutes.getRoutes());
    }

}
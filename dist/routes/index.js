"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const auth_1 = require("./api/auth");
const category_1 = require("./api/category");
const course_1 = require("./api/course");
const video_1 = require("./api/video");
class AppRoutes {
    constructor() {
        this.authRoutes = new auth_1.default();
        this.videoRoutes = new video_1.default();
        this.courseRoutes = new course_1.default();
        this.categoryRoutes = new category_1.default();
    }
    route(app) {
        app.use('/auth', this.authRoutes.getRoutes());
        app.use('/video', this.videoRoutes.getRoutes());
        app.use('/course', this.courseRoutes.getRoutes());
        app.use('/category', this.categoryRoutes.getRoutes());
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=index.js.map
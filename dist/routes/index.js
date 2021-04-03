"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const auth_1 = require("./api/auth");
const video_1 = require("./api/video");
class AppRoutes {
    constructor() {
        this.authRoutes = new auth_1.default();
        this.videoRoutes = new video_1.default();
    }
    route(app) {
        app.use('/auth', this.authRoutes.getRoutes());
        app.use('/video', this.videoRoutes.getRoutes());
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=index.js.map
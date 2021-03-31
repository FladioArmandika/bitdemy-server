"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const video_1 = require("./api/video");
class AppRoutes {
    constructor() {
        this.videoRoutes = new video_1.default();
    }
    route(app) {
        app.use('/video', this.videoRoutes.getRoutes());
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=index.js.map
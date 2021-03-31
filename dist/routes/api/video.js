"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_1 = require("../../controllers/video");
class VideoRoutes {
    constructor() {
        this.videoController = new video_1.default();
    }
    getRoutes() {
        const router = express_1.Router();
        router.get('/', this.videoController.getVideo);
        return router;
    }
}
exports.default = VideoRoutes;
//# sourceMappingURL=video.js.map
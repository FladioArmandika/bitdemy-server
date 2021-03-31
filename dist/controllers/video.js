"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class VideoController {
    constructor() {
        this.getVideo = (req, res) => {
            res.sendFile(path.resolve(__dirname + '/../assets/sample.mp4'));
        };
    }
}
exports.default = VideoController;
//# sourceMappingURL=video.js.map
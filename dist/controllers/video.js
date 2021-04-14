"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const service_1 = require("../common/service");
const video_1 = require("../models/video");
const video_2 = require("../services/video");
class VideoController {
    constructor() {
        // public getVideo = (req: Request, res: Response) => {
        //     res.sendFile(path.resolve(__dirname + '/../assets/vid1.mp4'));
        // }
        this.videoService = new video_2.default();
        this.getVideo = (req, res) => {
            if (req.query.videoId) {
                const query = { _id: req.query.videoId };
                this.videoService.getVideo(query, (error, video) => {
                    if (error) {
                        service_1.mongoError(error, res);
                    }
                    else {
                        service_1.successResponse('get video success', video, res);
                    }
                });
            }
            else {
                service_1.insufficientParameters(res);
            }
        };
        this.streamVideo = (req, res) => {
            if (req.query.videoId) {
                const query = { _id: req.query.videoId };
                this.videoService.getVideo(query, (error, video) => {
                    if (error) {
                        service_1.mongoError(error, res);
                    }
                    else {
                        res.sendFile(path.resolve(__dirname + `/../assets/${video.url}.mp4`));
                        service_1.successResponse('get video success', video, res);
                    }
                });
            }
            else {
                service_1.insufficientParameters(res);
            }
        };
        this.createVideo = (req, res) => {
            if (req.body.title && req.body.description &&
                req.body.course && req.body.url && req.body.length) {
                const videoParams = new video_1.default({
                    title: req.body.title,
                    description: req.body.description,
                    course: req.body.course,
                    url: req.body.url,
                    length: req.body.length,
                });
                this.videoService.createVideo(videoParams, (error, video) => {
                    if (error) {
                        service_1.mongoError(error, res);
                    }
                    else {
                        service_1.successResponse('create video success', video, res);
                    }
                });
            }
            else {
                service_1.insufficientParameters(res);
            }
        };
        this.deleteVideo = (req, res) => {
            if (req.query.videoId) {
                this.videoService.deleteVideo(req.query.videoId, (err, video) => {
                    if (err) {
                        service_1.mongoError(err, res);
                    }
                    else {
                        service_1.successResponse('delete video success', video, res);
                    }
                });
            }
            else {
                service_1.insufficientParameters(res);
            }
        };
        this.updateVideo = (req, res) => {
            if (req.query.videoId) {
                if (req.body.title || req.body.description ||
                    req.body.course || req.body.url || req.body.length) {
                    const updateParams = {};
                    if (req.body.title)
                        updateParams.title = req.body.title;
                    if (req.body.description)
                        updateParams.description = req.body.description;
                    if (req.body.course)
                        updateParams.course = req.body.course;
                    if (req.body.url)
                        updateParams.url = req.body.url;
                    if (req.body.length)
                        updateParams.length = req.body.length;
                    this.videoService.updateVideo(req.query.videoId, updateParams, (err, video) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('delete video success', video, res);
                        }
                    });
                }
                else {
                    service_1.insufficientParameters(res);
                }
            }
            else {
                service_1.insufficientParameters(res);
            }
        };
    }
}
exports.default = VideoController;
//# sourceMappingURL=video.js.map
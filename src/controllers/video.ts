import { Request, Response } from "express";
import { Error } from "mongoose";
import * as path from 'path';
import { insufficientParameters, mongoError, successResponse } from "../common/service";
import Video, { VideoDocument } from "../models/video";
import VideoService from "../services/video";
export default class VideoController {

    // public getVideo = (req: Request, res: Response) => {
    //     res.sendFile(path.resolve(__dirname + '/../assets/vid1.mp4'));
    // }

    private videoService: VideoService = new VideoService();

    public getVideo = (req: Request, res: Response) => {
        if (req.query.videoId) {
            const query = { _id: req.query.videoId }
            this.videoService.getVideo(query, (error: Error, video: VideoDocument) => {
                if (error) {
                    mongoError(error, res);
                } else {
                    successResponse('get video success', video, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public streamVideo = (req: Request, res: Response) => {
        if (req.query.videoId) {
            const query = { _id: req.query.videoId }
            this.videoService.getVideo(query, (error: Error, video: VideoDocument) => {
                if (error) {
                    mongoError(error, res);
                } else {
                    res.sendFile(path.resolve(__dirname + `/../assets/${video.url}.mp4`));
                    successResponse('get video success', video, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public createVideo = (req: Request, res: Response) => {
        if (req.body.title && req.body.description && 
            req.body.course && req.body.url && req.body.length) {
            const videoParams: VideoDocument = new Video({
                title: req.body.title,
                description: req.body.description,
                course: req.body.course,
                url: req.body.url,
                length: req.body.length,
            });

            this.videoService.createVideo(videoParams, (error: Error, video: VideoDocument) => {
                if (error) {
                    mongoError(error, res);
                } else {
                    successResponse('create video success', video, res);
                }
            })
        } else {
            insufficientParameters(res)
        }
    }

    public deleteVideo = (req: Request, res: Response) => {
        if (req.query.videoId) {
            this.videoService.deleteVideo(req.query.videoId as string, (err: Error, video: VideoDocument) => {
                if (err) {
                    mongoError(err, res)
                } else {
                    successResponse('delete video success', video, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public updateVideo = (req: Request, res: Response) => {
        if (req.query.videoId) {
            if (req.body.title || req.body.description || 
                req.body.course || req.body.url || req.body.length) {

                const updateParams: any = {};
                if (req.body.title) updateParams.title = req.body.title;
                if (req.body.description) updateParams.description = req.body.description;
                if (req.body.course) updateParams.course = req.body.course;
                if (req.body.url) updateParams.url = req.body.url;
                if (req.body.length) updateParams.length = req.body.length;

                this.videoService.updateVideo(req.query.videoId as string, updateParams, (err: Error, video: VideoDocument) => {
                    if (err) {
                        mongoError(err, res)
                    } else {
                        successResponse('delete video success', video, res);
                    }
                })
            } else {
                insufficientParameters(res);
            }
        } else {
            insufficientParameters(res);
        }
    }

}
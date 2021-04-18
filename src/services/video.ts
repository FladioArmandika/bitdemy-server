import Video, { VideoDocument } from "../models/video";

export default class VideoService {

    public createVideo(videoParams: VideoDocument, callback: any) {
        const session = new Video(videoParams);
        session.save().then(callback);
    }

    public getVideo(query: any, callback: any) {
        Video.findOne(query)
            .populate('course')
            .exec(callback);
    }

    public getVideosByCourse(courseId: string, callback: any) {
        Video.find({course: courseId}, callback);
    }

    public deleteVideo(videoId: string, callback: any) {
        const query = { _id: videoId }
        Video.deleteOne(query, callback);
    }

    public updateVideo(videoId: string, updated: any, callback: any) {
        const query = { _id: videoId }
        Video.findOneAndUpdate(query, updated, callback);
    }

}
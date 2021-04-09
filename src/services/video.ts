import Video, { VideoDocument } from "../models/video";

export default class VideoService {

    public createVideo(videoParams: VideoDocument, callback: any) {
        const session = new Video(videoParams);
        session.save();
    }

    public getVideo(query: any, callback: any) {
        Video.findOne(query)
            .populate('course');
    }

    public getVideoByCourse(courseId: string, callback: any) {
        Video.findOne({course: courseId}, callback);
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
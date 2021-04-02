import Video, { VideoDocument } from "../models/video";

export default class VideoService {

    public createVideo(videoParams: VideoDocument, callback: any) {
        const session = new Video(videoParams);
        session.save();
    }

    public getVideo(query: any, callback: any) {
        Video.findOne(query, callback);
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
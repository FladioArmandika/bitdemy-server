import { Document, model, Schema } from "mongoose";
import { UserDocument } from "./user";
import { VideoDocument } from "./video";


export interface ProgressVideoDocument extends Document {
    user: UserDocument['_id'],
    video: VideoDocument['_id'],
    time: number,
}

const progressVideoSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
    },
    time: {
        type: Schema.Types.Number
    },
});

const ProgressVideo = model<ProgressVideoDocument>('ProgressVideo', progressVideoSchema);
export default ProgressVideo;

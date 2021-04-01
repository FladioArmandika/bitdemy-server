import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";
import { RatingDocument } from "./rating";


export interface VideoDocument extends Document {
    title: string,
    description: string,
    course: CourseDocument['_id'],
    url: string,
    length: number,
}

const videoSchema: Schema = new Schema({
    title: {
        type: Schema.Types.String
    },
    description: {
        type: Schema.Types.String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    url: {
        type: Schema.Types.String
    },
    length: {
        type: Schema.Types.Number
    },
});

const Video = model<VideoDocument>('Video', videoSchema);
export default Video;

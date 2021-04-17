import { NextFunction } from "express";
import { Document, Error, model, Schema } from "mongoose";
import Course, { CourseDocument } from "./course";
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

videoSchema.pre('save', (next: NextFunction) => {
    const video: VideoDocument = this;
    // UPDATE COURSE
    Course.findOneAndUpdate(
        { _id: video.course },
        { $push: {videos: video._id } },
        { upsert: false },
        (err: Error, course: CourseDocument) => {
            if (!err) {
                next();
            }
        })
})

const Video = model<VideoDocument>('Video', videoSchema);
export default Video;

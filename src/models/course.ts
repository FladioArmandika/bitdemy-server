import { Document, model, Schema } from "mongoose";
import { CategoryDocument } from "./category";
import { RatingDocument } from "./rating";
import { UserDocument } from "./user";
import { VideoDocument } from "./video";

enum CourseLevel {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced',
}

export interface CourseDocument extends Document {
    name: string,
    category: CategoryDocument['_id'],
    levels: CourseLevel,
    ratings: RatingDocument['_id'][],
    videos: VideoDocument['_id'][],

}

const courseSchema: Schema = new Schema({
    name: {
        type: Schema.Types.String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    level: {
        type: Schema.Types.String,
        enum: CourseLevel,
        default: CourseLevel.BEGINNER,
    },
    ratings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rating',
        }
    ],
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        }
    ],
});

const Course = model<CourseDocument>('Course', courseSchema);
export default Course;

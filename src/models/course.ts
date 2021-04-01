import { Document, model, Schema } from "mongoose";
import { RatingDocument } from "./rating";
import { UserDocument } from "./user";

enum CourseLevel {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced',
}

export interface CourseDocument extends Document {
    name: string,
    levels: CourseLevel,
    ratings: RatingDocument['_id'][],
}

const courseSchema: Schema = new Schema({
    name: {
        type: Schema.Types.String
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

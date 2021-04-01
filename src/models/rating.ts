import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";
import { UserDocument } from "./user";

export interface RatingDocument extends Document {
    user: UserDocument['_id'],
    course: CourseDocument['_id'],
    rate: number,
    caption: string,
}

const ratingSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    rate: {
        type: Schema.Types.Number,
        enum: [0,1,2,3,4,5],
        default: 0,
    },
    caption: {
        type: Schema.Types.String
    },
});


const Rating = model<RatingDocument>('Rating', ratingSchema);
export default Rating;
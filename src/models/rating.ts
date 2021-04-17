import { NextFunction } from "express";
import { Document, Error, model, Schema } from "mongoose";
import Course, { CourseDocument } from "./course";
import User, { UserDocument } from "./user";

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

ratingSchema.pre('save', (next: NextFunction) => {
    const rating: RatingDocument = this;
    // UPDATE USER
    User.findOneAndUpdate(
        { _id: rating.user },
        { $push: { ratings: rating._id } },
        { upsert: false },
        ( errUser: Error, user: UserDocument) => {
            if (!errUser) {
                // UPDATE COURSE
                Course.findOneAndUpdate(
                    { _id: rating.course },
                    { $push: { ratings: rating._id } },
                    { upsert: false },
                    ( errCourse: Error, course: CourseDocument) => {
                        if (!errCourse) {
                            next();
                        }
                    }
                )
            }
        }
    )
})


const Rating = model<RatingDocument>('Rating', ratingSchema);
export default Rating;
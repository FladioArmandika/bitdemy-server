import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";
import { ProgressVideoDocument } from "./progressVideo";
import { RatingDocument } from "./rating";

export interface UserDocument extends Document {
    email: string,
    password: string,
    googleId: string,
    username: string,
    profileUrl: string,
    courses: CourseDocument['_id'][],
    progressVideos: ProgressVideoDocument['_id'][],
    ratings: RatingDocument['_id'][],
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String
    },
    username: {
        type: String,
    },
    profileUrl: {
        type: String,
        default: '',
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    progressVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProgressVideo',
        }
    ],
    ratings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rating',
        }
    ],
})

const User = model<UserDocument>("User", userSchema);
export default User;

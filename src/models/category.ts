import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";

export interface CategoryDocument extends Document {
    name: string,
    courses: CourseDocument['_id'][],
}

const CategorySchema: Schema = new Schema({
    name: {
        type: String,
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

const Category = model<CategoryDocument>("Category", CategorySchema);
export default Category;
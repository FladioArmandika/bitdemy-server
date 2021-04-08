import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";

export interface CategoryDocument extends Document {
    name: string,
    course: CourseDocument['_id'][],
}

const CategorySchema = new Schema({
    name: {
        type: String,
    },
    course: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

const Category = model<CategoryDocument>("Category", CategorySchema);
export default Category;
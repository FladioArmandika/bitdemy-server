import Category, { CategoryDocument } from "../models/category";

export default class CategoryService {

    public getCategories(callback: any) {
        Category.find({})
            .populate('courses')
            .exec(callback);
    }

    public getCategory(categoryId: string, callback: any) {
        Category.findOne({_id: categoryId})
            .populate('courses')
            .exec(callback);
    }

    public createCategory(categoryParams: CategoryDocument, callback: any) {
        const session = new Category(categoryParams);
        session.save(callback);
    }

    public deleteCategory(categoryId: string, callback:any) {
        Category.findOneAndDelete({_id: categoryId})
            .exec(callback);
    }

    public updateCategory(categoryId: string, updated: any, callback: any) {
        Category.findOneAndUpdate({_id: categoryId}, updated, callback);
    }


}
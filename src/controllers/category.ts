import { Request, Response } from "express";
import { Error } from "mongoose";
import { insufficientParameters, mongoError, successResponse } from "../common/service";
import Category, { CategoryDocument } from "../models/category";
import CategoryService from "../services/category";

export default class CategoryController {

    private categoryService: CategoryService = new CategoryService();

    public createCategory = (req: Request, res: Response) => {
        if (req.body.name ) {
            const category: CategoryDocument = new Category({
                name: req.body.name,
                courses: []
            })
            this.categoryService.createCategory(category, (err: Error, data: CategoryDocument) => {
                if (err) {
                    mongoError(err, res)
                } else {
                    successResponse('Create category success', data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getCategory = (req: Request, res: Response) => {
        if (req.query.categoryId) {
            this.categoryService.getCategory(req.query.categoryId as string, (err: Error, category: CategoryDocument) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get category success', category, res);
                }
            });
        } else {
            this.categoryService.getCategories((err: Error, categories: CategoryDocument[]) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get all categories success', categories, res);
                }
            })
        }
    }

    public deleteCategory = (req: Request, res: Response) => {
        if (req.query.categoryId) {
            this.categoryService.deleteCategory(req.query.categoryId as string, (err: Error, category: CategoryDocument) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('delete category success', category, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public updateCategory = (req: Request, res: Response) => {
        if (req.query.categoryId) {
            if (req.body.name) {
                this.categoryService.getCategory(req.query.categoryId as string, (err: Error, categoryFound: CategoryDocument) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        const updated:any = {}
                        if (req.body.name) updated.name = req.body.name;

                        this.categoryService.updateCategory(req.query.categoryId as string, updated, (errUpdate: Error, result: CategoryDocument) => {
                            if (errUpdate) {
                                mongoError(errUpdate, res);
                            } else {
                                successResponse('update category success', updated, res);
                            }
                        })
                    }
                })
            } else {
                insufficientParameters(res);
            }
        } else {
            insufficientParameters(res);
        }
    }

}
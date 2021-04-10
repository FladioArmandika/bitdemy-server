import { Request, Response } from "express";
import Course, { CourseDocument } from "../models/course";
import { insufficientParameters, mongoError, successResponse } from "../common/service";
import CourseService from "../services/course";
import { Error } from "mongoose";

export default class CourseController {

    private courseService: CourseService = new CourseService();

    public createCourse(req: Request, res: Response) {
        if (req.body.name && req.body.category && req.body.level) {
            const course: CourseDocument = new Course({
                name: req.body.name,
                category: req.body.category,
                level: req.body.level,
            })

            this.courseService.createCourse(course, (err: Error, data: CourseDocument) => {
                if (err) {
                    mongoError(err, res)
                } else {
                    successResponse('Create course success', data, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public getCourse(req: Request, res: Response) {
        if (req.query.courseId) {
            const query = { _id: req.body.courseId };
            this.courseService.getCourse(query, (err: Error, course: CourseDocument) => {
                if (err) {
                    mongoError(err, res)
                } else {
                    successResponse('get course success', course, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public getCourseByCategory(req: Request, res: Response) {
        if (req.query.categoryId) {
            this.courseService.getCourseByCategory(req.body.categoryId, (err: Error, course: CourseDocument) => {
                if (err) {
                    mongoError(err, res)
                } else {
                    successResponse('get course by category success', course, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public deleteCourse(req: Request, res: Response) {
        if (req.query.courseId) {
            this.courseService.deleteCourse(req.body.courseId, (err: Error, course: CourseDocument) => {
                if (err) {
                    mongoError(err, res)
                } else {2
                    successResponse('delete course success', course, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public updateCourse(req: Request, res: Response) {
        if (req.query.courseId) {
            if (req.body.name || req.body.category || req.body.level) {
                this.courseService.getCourse(req.body.courseId, (err: Error, courseFound: CourseDocument) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        var updated:any = {}
                        if (req.body.name) updated.name = req.body.name;
                        if (req.body.category) updated.category = req.body.category;
                        if (req.body.level) updated.level = req.body.level;

                        this.courseService.updateCourse(req.body.courseId, updated, (err: Error, result: CourseDocument) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                successResponse('update course success', updated, res);
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
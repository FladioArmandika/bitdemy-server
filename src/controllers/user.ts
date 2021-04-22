import { Request, Response } from "express";
import UserService from "../services/user";
import { insufficientParameters, mongoError, successResponse } from "../common/service";
import { Error } from "mongoose";
import { UserDocument } from "../models/user";

export default class UserController {

    private userService: UserService = new UserService();

    public getUser = (req: Request, res: Response) => {
        if (req.query.userId || req.query.googleId) {
            let query = {};
            if (req.query.userId) query = { _id: req.query.userId }
            if (req.query.googleId) query = { googleId: req.query.googleId }
            this.userService.getUser(query, (err: Error, user: UserDocument) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('enroll course success', user, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public enrollCourse = (req: Request, res: Response) => {
        if (req.query.userId && req.query.courseId) {
            const updateParams = { $push: { courses: req.query.courseId } }
            this.userService.updateUser(req.query.userId as string, updateParams, (err: Error, user: UserDocument) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('enroll course success', user, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public leaveCourse = (req: Request, res: Response) => {
        if (req.query.userId && req.query.courseId) {
            const updateParams = { $pull: { courses: req.query.courseId } }
            this.userService.updateUser(req.query.userId as string, updateParams, (err: Error, user: UserDocument) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('leave course success', user, res);
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

}
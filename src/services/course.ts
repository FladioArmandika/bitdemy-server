import Course, { CourseDocument } from "../models/course";

export default class CourseService {

    public createCourse(courseParams: CourseDocument, callback: any) {
        const session = new Course(courseParams);
        session.save();
    }

    public getCourse(query: any, callback: any) {
        Course.findOne(query, callback);
    }

    public getCourseByCategory(categoryId: string, callback: any) {
        Course.find({category: categoryId}, callback);
    }

    public deleteCourse(courseId: string, callback: any) {
        const query = { _id: courseId }
        Course.deleteOne(query, callback);
    }

    public updateCourse(courseId: string, updated: any, callback: any) {
        const query = { _id: courseId }
        Course.findOneAndUpdate(query, updated, callback);
    }

}
import { Router } from "express";
import CourseController from "../../controllers/course";

export default class CourseRoutes {

    private courseController: CourseController = new CourseController();

    public getRoutes = (): Router  => {
        const router: Router = Router();
        router.get('', this.courseController.getCourse)
        router.get('/category', this.courseController.getCourseByCategory)
        router.post('', this.courseController.createCourse)
        router.delete('', this.courseController.deleteCourse)
        router.put('', this.courseController.updateCourse)

        return router;
    }

}
import { Router } from "express";
import UserController from "../../controllers/user";

export class UserRoutes {

    private userController: UserController = new UserController();

    public getRoutes = (): Router => {
        const router: Router = Router();
        router.get('', this.userController.getUser)
        router.post('/course', this.userController.enrollCourse)
        router.delete('/course', this.userController.leaveCourse)
        return router;
    }

}
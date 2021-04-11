import { Router } from "express";
import CategoryController from "../../controllers/category"

export default class CategoryRoutes {

    private categoryController: CategoryController = new CategoryController();

    public getRoutes = (): Router => {
        const router: Router = Router();
        router.get('', this.categoryController.getCategory)
        router.post('', this.categoryController.createCategory)
        router.delete('', this.categoryController.deleteCategory)
        router.put('', this.categoryController.updateCategory)

        return router;
    }

}
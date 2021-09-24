import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.CategoryController.findCategoryBySQL);
router.get("/",IndexController.CategoryController.findAllRows);
router.get("/detail",IndexController.CategoryController.cateProducts);

router.get("/:id",IndexController.CategoryController.findCategoryById);

// method post

router.post("/",IndexController.CategoryController.createCateRow);

// method put

router.put("/:id",IndexController.CategoryController.updateCateRow);

// method delete

router.delete("/:id",IndexController.CategoryController.deleteCateRow);

export default router;
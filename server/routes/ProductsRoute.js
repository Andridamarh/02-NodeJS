import { Router } from "express";
import IndexController from "../controller/IndexController";
import UpDownloadHelper from "../helpers/UpDownloadHelper"

const router = Router();

router.get("/",IndexController.ProductsController.findAllRows);
router.get("/images/:filename",UpDownloadHelper.showProductImage);
router.get("/:id",IndexController.ProductsController.findProdById)

router.post("/",IndexController.ProductsController.createRows);
router.post("/multipart",IndexController.ProductsController.createProductImage,
IndexController.ProductImageCtrl.createProductImage,
IndexController.ProductImageCtrl.findProdImagesById);

router.put("/:id",IndexController.ProductsController.updateProduct);

export default router;
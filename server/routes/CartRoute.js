import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/",IndexController.CartCtrl.findAllRows);
router.get("/checkout",IndexController.CartCtrl.checkOut)
router.get("/:id",IndexController.CartCtrl.findCartById);


router.post("/addtocart",IndexController.CartCtrl.addToCart);
router.post("/addlite",IndexController.CartCtrl.addLite)


router.put("/updatelite",IndexController.CartCtrl.updateLite);

export default router;
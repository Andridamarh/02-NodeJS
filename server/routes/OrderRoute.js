import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/", IndexController.OrderCtrl.findAllROws)

router.post("/", IndexController.OrderCtrl.createRows)

export default router;
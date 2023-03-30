import { Router } from "express";
const router = Router();
import usersController from "./users.controller";

router.get("", usersController.getUserInfo);
router.patch("", usersController.updateUserInfo);

export default router;
import { Router } from "express";
const router = Router();
import usersController from "./users.controller";

router.get("", usersController.getUserInfo);

export default router;
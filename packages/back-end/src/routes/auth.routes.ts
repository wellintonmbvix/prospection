import { Router } from "express";
import usersController from "../controllers/UsersController";

const usersRouter = Router();

usersRouter.post("/", usersController.findUserByUserPass);

export default usersRouter;
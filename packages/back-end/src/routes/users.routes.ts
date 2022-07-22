import { Router } from "express";
import usersController from "../controllers/UsersController";

const usersRouter = Router();
const auth = require("../middleware/Auth").auth;

usersRouter.get("/", auth, usersController.findAllUsers);
usersRouter.get("/:id", auth, usersController.findUsersById);
usersRouter.post("/create", auth, usersController.createUser);
usersRouter.put("/update/:id", auth, usersController.updateUser);
usersRouter.delete("/:id", auth, usersController.deleteUser);

export default usersRouter;

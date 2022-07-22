import { Router } from "express";
import ratingsController from "../controllers/RatingsController";

const ratingsRoutes = Router();
const auth = require("../middleware/Auth").auth;

ratingsRoutes.get("/", auth, ratingsController.findAllRatings);
ratingsRoutes.get("/:id", auth, ratingsController.findRatingsById);
ratingsRoutes.post("/create", auth, ratingsController.createRating);
ratingsRoutes.put("/update/:id", auth, ratingsController.updateRatings);
ratingsRoutes.delete("/:id", auth, ratingsController.deleteRating);

export default ratingsRoutes;

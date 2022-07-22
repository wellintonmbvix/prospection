import { Router } from "express";
import citiesController from "../controllers/CitiesController";

const citiesRouter = Router();

citiesRouter.get("/", citiesController.findAllCities);

export default citiesRouter;

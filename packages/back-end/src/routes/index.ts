import { Router } from "express";
import usersRouter from "./users.routes";
import citiesRouter from "./cities.routes";
import ratingsRoutes from "./ratings.routes";
import prospectsRoutes from "./prospects.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.get("/", (_, res) => {
  return res.json({ message: "Welcome to API with Prisma 2 and Express" });
});

router.use("/users", usersRouter);
router.use("/cities", citiesRouter);
router.use("/ratings", ratingsRoutes);
router.use("/prospects", prospectsRoutes);
router.use("/login", authRoutes);

export default router;

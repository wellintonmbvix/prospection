import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class CitiesController {
  public async findAllCities(_: Request, res: Response) {
    try {
      const cities = await prisma.tbcities.findMany({
        orderBy: { county: "asc" },
      });

      if (cities.length === 0)
        return res.json({ message: "No momento não existe nenhuma cidade" });

      return res.json(cities);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new CitiesController();

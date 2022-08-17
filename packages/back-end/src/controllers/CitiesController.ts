import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class CitiesController {
  public async findAllCities(_: Request, res: Response) {
    try {
      let { uf = "ES" } = _.query;      

      const cities = await prisma.cidades.findMany({        
        orderBy: { counter: "asc" },
        where: {
          uf: {
            contains: String(uf),
          },
        }
      });

      if (cities.length === 0)
        return res.json([]);

      return res.json(cities);
    } catch (err) {
      return res.status(500).json({ erro: err });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new CitiesController();

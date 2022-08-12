import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class RatingsController {
  public async findAllRatings(_: Request, res: Response) {
    try {
      const ratings = await prisma.seguimentos.findMany({
        orderBy: { created_at: "asc" },
      });

      if (ratings.length === 0) return res.json([]);

      return res.json(ratings);
    } catch (err) {
      console.log({ message: err });
      return res.json([]);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findRatingsById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rating = await prisma.seguimentos.findUnique({
        where: { seguimentoId: id },
      });

      if (!rating)
        return res
          .status(404)
          .json({ message: "Classificação não encontrada" });

      return res.json(rating);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async createRating(req: Request, res: Response) {
    try {
      const { descricao } = req.body;

      const rating = await prisma.seguimentos.create({
        data: {
          descricao,
        },
      });

      return res.status(201).json(rating);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async updateRatings(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const rating = await prisma.seguimentos.update({
        data: {
          ...req.body,
        },
        where: { seguimentoId: id },
      });

      if (!rating) {
        return res.json({ message: "Classificação não encontrada" });
      }

      return res.json(rating);
    } catch (err) {
      return res.status(500).json({ message: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async deleteRating(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const rating = await prisma.seguimentos.delete({
        where: { seguimentoId: id },
      });

      if (!rating) return res.json({ message: "Classificação não encontrada" });

      return res
        .status(204)
        .json({ message: "Classificação excluída com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: err });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new RatingsController();

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class RatingsController {
  public async findAllRatings(req: Request, res: Response) {
    try {
      let { linhas = 50, pagina = 1, byDescricao = "" } = req.query;

      const registros = await prisma.seguimentos.count({
        where: {
          descricao: {
            contains: String(byDescricao),
          },
        },
      });

      const totalPages = Math.ceil(registros / Number(linhas)).toFixed(0);

      if (pagina == "1") {
        const ratings = await prisma.seguimentos.findMany({
          take: Number(linhas),
          orderBy: { created_at: "asc" },
          where: {
            descricao: {
              contains: String(byDescricao),
            },
          },
        });

        if (ratings.length === 0) return res.json([]);

        return res.json({
          ratings,
          pagina: pagina,
          totalPages: totalPages,
          totalRecords: registros,
        });
      } else {
        const ratings = await prisma.seguimentos.findMany({
          take: Number(linhas),
          skip: (Number(linhas) * Number(pagina)) - Number(linhas),
          orderBy: { created_at: "asc" },
          where: {
            descricao: {
              contains: String(byDescricao),
            },
          },
        });

        if (ratings.length === 0) return res.json([]);

        return res.json({
          ratings,
          pagina: pagina,
          totalPages: totalPages,
          totalRecords: registros,
        });
      }
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

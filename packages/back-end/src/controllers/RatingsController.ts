import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class RatingsController {
  public async findAllRatings(_: Request, res: Response) {
    try {
      const ratings = await prisma.tbclassification.findMany({
        orderBy: { counter: "asc" },
      });

      if (ratings.length === 0)
        return res.json({
          message: "No momento não existe nenhuma classificação",
        });

      return res.json(ratings);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findRatingsById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rating = await prisma.tbclassification.findUnique({
        where: { counter: Number(id) },
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
      const { description, user } = req.body;

      const rating = await prisma.tbclassification.create({
        data: {
          description,
          user,
        },
      });

      return res.status(201).json(rating);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async updateRatings(req: Request, res: Response){
    try{
      const { id } = req.params

      const rating = await prisma.tbclassification.update({
        data: {
          ...req.body,
        },
        where: { counter: Number(id) },
      });

      if (!rating) {
        return res.json({ message: "Classificação não encontrada" });
      }

      return res.json(rating);      
    }catch(err){
      return res.status(500).json({message: err})
    }finally{
      await prisma.$disconnect();
    }
  }

  public async deleteRating(req: Request, res: Response){
    try {
      const { id } = req.params;

      const rating = await prisma.tbclassification.delete({
        where: { counter: Number(id) },
      });

      if (!rating) return res.json({ message: "Classificação não encontrada" });

      return res.status(204).json({message: "Classificação excluída com sucesso"});
    } catch (err) {
      return res.status(500).json({message: err})
    }finally{
      await prisma.$disconnect();
    }
  }
}

export default new RatingsController();

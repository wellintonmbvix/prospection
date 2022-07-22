import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ProspectsController {
  public async findAllProspects(req: Request, res: Response) {
    try {
      let { linhas = 50, pagina = 1, byName = "" } = req.query;

      const registros = await prisma.tbprospection.count({
        where: {
          name: {
            contains: String(byName),
          },
        },
      });

      const totalPages = Math.ceil(registros / Number(linhas)).toFixed(0);

      if (pagina == "1") {
        const prospects = await prisma.tbprospection.findMany({
          take: Number(linhas),
          orderBy: { counter: "asc" },
          where: {
            name: {
              contains: String(byName),
            },
          },
        });

        if (prospects.length === 0)
          return res.json({
            message: "No momento não existe nenhuma classificação",
          });

        return res.json({
          data: {
            prospects,
            pagina: pagina,
            totalPages: totalPages,
          },
        });
      } else {
        const prospects = await prisma.tbprospection.findMany({
          take: Number(linhas),
          skip: Number(linhas) * Number(pagina),
          orderBy: { counter: "asc" },
          where: {
            name: {
              contains: String(byName),
            },
          },
        });

        if (prospects.length === 0)
          return res.json({
            message: "No momento não existe nenhuma classificação",
          });

        return res.json({
          prospects,
          pagina: pagina,
          totalPages: totalPages,
        });
      }
    } catch (err) {
      return res.status(500).json({ erro: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findProspectsById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prospect = await prisma.tbprospection.findUnique({
        where: {
          counter: Number(id),
        },
      });

      if (!prospect)
        return res.status(404).json({ message: "Prospecção não encontrada" });

      return res.json(prospect);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async createProspects(req: Request, res: Response) {
    try {
      const {
        name,
        contact,
        phone1,
        phone2,
        email,
        classification,
        city,
        state,
        nextcontact,
        system,
        observation,
        active = 1,
        user,
        nlpc,
      } = req.body;

      const prospect = await prisma.tbprospection.create({
        data: {
          name,
          contact,
          phone1,
          phone2,
          email,
          classification,
          city,
          state,
          nextcontact,
          system,
          observation,
          active,
          user,
          nlpc,
        },
      });

      return res.status(201).json(prospect);
    } catch (err) {
      return res.status(415).json({ error: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async updateProspects(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prospect = await prisma.tbprospection.update({
        data: {
          ...req.body,
        },
        where: { counter: Number(id) },
      });

      if (!prospect) {
        return res.json({ message: "Prospecção não encontrada" });
      }

      return res.json(prospect);
    } catch (err) {
      return res.status(500).json({ message: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async deleteProspect(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prospect = await prisma.tbprospection.delete({
        where: { counter: Number(id) },
      });

      if (!prospect) return res.json({ message: "Prospecção não encontrada" });

      return res
        .status(204)
        .send({ message: "Prospecção excluída com sucesso" });
    } catch (err) {
      return res.status(500).json({ message: err });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new ProspectsController();

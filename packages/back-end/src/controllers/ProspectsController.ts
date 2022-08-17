import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ProspectsController {
  public async findAllProspects(req: Request, res: Response) {
    try {
      let { linhas = 50, pagina = 1, byName = "" } = req.query;

      const registros = await prisma.prospeccao.count({
        where: {
          nomeEmpresa: {
            contains: String(byName),
          },
        },
      });

      const totalPages = Math.ceil(registros / Number(linhas)).toFixed(0);

      if (pagina == "1") {
        const prospects = await prisma.prospeccao.findMany({
          take: Number(linhas),
          orderBy: { created_at: "asc" },
          select: {
            prospeccaoId: true,
            nomeEmpresa: true,
            nomeContato: true,
            telefone1: true,
            telefone2: true,
            email1: true,
            email2: true,
            id_seguimento: false,
            seguimento: true,
            cidade: true,
            estado: true,
            proximoContato: true,
            nomeSistema: true,
            observacao: true,
            ativo: true,
            created_at: true,
            updated_at: true,
            id_usuario: false,
            usuario: true
          },
          where: {
            nomeEmpresa: {
              contains: String(byName),
            },
          },
        });

        if (prospects.length === 0)
          return res.json([]);

        return res.json({
          prospects,
          pagina: pagina,
          totalPages: totalPages,
          totalRecords: prospects.length
        });
      } else {
        const prospects = await prisma.prospeccao.findMany({
          take: Number(linhas),
          skip: Number(linhas) * Number(pagina),
          select: {
            prospeccaoId: true,
            nomeEmpresa: true,
            nomeContato: true,
            telefone1: true,
            telefone2: true,
            email1: true,
            email2: true,
            id_seguimento: false,
            seguimento: true,
            cidade: true,
            estado: true,
            proximoContato: true,
            nomeSistema: true,
            observacao: true,
            ativo: true,
            created_at: true,
            updated_at: true,
            id_usuario: false,
            usuario: true
          },
          orderBy: { created_at: "asc" },
          where: {
            nomeEmpresa: {
              contains: String(byName),
            },
          },
        });

        if (prospects.length === 0)
          return res.json([]);

        return res.json({
          prospects,
          pagina: pagina,
          totalPages: totalPages,
          totalRecords: prospects.length
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

      const prospect = await prisma.prospeccao.findUnique({
        where: {
          prospeccaoId: id,
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
        nomeEmpresa,
        nomeContato,
        telefone1,
        telefone2,
        email1,
        email2,
        id_seguimento,
        cidade,
        estado,
        proximoContato,
        nomeSistema,
        observacao,
        ativo = 1,
        id_usuario,        
      } = req.body;

      const prospect = await prisma.prospeccao.create({
        data: {
          nomeEmpresa,
          nomeContato,
          telefone1,
          telefone2,
          email1,
          email2,
          id_seguimento,
          cidade,
          estado,
          proximoContato,
          nomeSistema,
          observacao,
          ativo,
          id_usuario,          
        },
      });

      return res.status(201).json(prospect);
    } catch (err) {
      console.log(err)
      return res.status(415).json({ error: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async updateProspects(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prospect = await prisma.prospeccao.update({
        data: {
          ...req.body,
        },
        where: { prospeccaoId: id },
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

      const prospect = await prisma.prospeccao.delete({
        where: { prospeccaoId: id },
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

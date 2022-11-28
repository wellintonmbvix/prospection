import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as crypto from "crypto";

const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const secret = process.env.SECRET;
let secretKey: string;
if (secret === undefined) {
  secretKey = "";
} else {
  secretKey = secret;
}

class UsersController {
  public async findAllUsers(_: Request, res: Response) {
    try {
      const users = await prisma.users.findMany({
        select: {
          usuarioId: true,
          nomeUsuario: true,
          acessoUsuarios: true,
          acessoSeguimentos: true,
          acessoProspeccao: true,
        },
        orderBy: { created_at: "asc" },
      });

      if (users.length === 0) return res.json([]);

      return res.json(users);
    } catch (err) {
      console.log({ message: err });
      return res.status(501).json([]);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findUsersById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await prisma.users.findUnique({
        where: { usuarioId: id },
      });

      if (!usuario)
        return res.status(404).json({ message: "Usuário não encontrado" });

      return res.json(usuario);
    } catch (err) {
      console.log({ message: err });
      return res.status(501).json([]);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findUserByUserPass(req: Request, res: Response) {
    try {
      const { nome, senha } = req.body;

      const hash = crypto
        .createHmac("sha256", secretKey)
        .update(senha)
        .digest("base64");

      const usuario = await prisma.users.findFirst({
        where: { nomeUsuario: nome, senhaAcesso: hash },
        select: {
          usuarioId: true,
          nomeUsuario: true,
          acessoUsuarios: true,
          acessoSeguimentos: true,
          acessoProspeccao: true,
        },
      });

      if (!usuario)
        return res
          .status(403)
          .send({
            auth: false,
            token: "",
            usuarioId: "",
            message: "Usuário ou senha inválidos",
          });

      const token = jwt.sign(
        {
          usuarioId: usuario.usuarioId,
          acessoUsuarios: usuario.acessoUsuarios,
          acessoSeguimentos: usuario.acessoSeguimentos,
          acessoProspeccao: usuario.acessoProspeccao,
        },
        secret,
        {
          expiresIn: 3600,
        }
      );

      return res.status(201).json({
        auth: true,
        token: `Bearer ${token}`,
        usuarioId: usuario.usuarioId,
        message: "Usuário logado com sucesso!",
      });
    } catch (err) {
      return res.status(400).json({ message: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      // Método de criptografia 'sha256'
      const hash = crypto
        .createHmac("sha256", secretKey)
        .update(req.body.senhaAcesso)
        .digest("base64");

      const {
        nomeUsuario,
        senhaAcesso,
        acessoUsuarios,
        acessoSeguimentos,
        acessoProspeccao,
      } = req.body;

      const users = await prisma.users.create({
        data: {
          nomeUsuario,
          senhaAcesso: hash,
          acessoUsuarios,
          acessoSeguimentos,
          acessoProspeccao,
        },
      });

      return res.status(201).json(users);
    } catch (err) {
      return res.status(500).json({ message: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        nomeUsuario,
        senhaAcesso,
        acessoUsuarios,
        acessoSeguimentos,
        acessoProspeccao,
      } = req.body;

      const user = await prisma.users.update({
        data: {
          nomeUsuario,
          senhaAcesso,
          acessoUsuarios,
          acessoSeguimentos,
          acessoProspeccao,
        },
        where: { usuarioId: id },
      });

      if (!user) {
        return res.json({ message: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.users.delete({
        where: { usuarioId: id },
      });      

      res.status(200).json(JSON.stringify({
        success: true,
        message: "Exclusão realizada com sucesso",
      }));
    } catch (err) {
      return res.json(JSON.stringify({
        success: false,
        message: `Erro durante exclusão: ${err}`,
      }));
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new UsersController();

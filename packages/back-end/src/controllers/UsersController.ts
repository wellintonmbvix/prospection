import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as crypto from "crypto";

const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const secret = process.env.SECRET;

class UsersController {
  public async findAllUsers(_: Request, res: Response) {
    try {
      const users = await prisma.tbusers.findMany({
        orderBy: { dtcreated: "desc" },
      });

      if (users.length === 0)
        return res.json({ message: "No momento não existe nenhum usuário" });

      return res.json(users);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findUsersById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await prisma.tbusers.findUnique({
        where: { counter: Number(id) },
      });

      if (!usuario)
        return res.status(404).json({ message: "Usuário não encontrado" });

      return res.json(usuario);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findUserByUserPass(req: Request, res: Response) {
    try {
      const { name, password } = req.body;

      const hash = crypto
        .createHmac("sha256", secret) /** a const "secret" está acusando erro devido ao ESLint do typescript mas a API funciona */
        .update(password)
        .digest("base64");

      const usuario = await prisma.tbusers.findFirst({
        where: { name: name, password: hash },
        select: {
          counter: true,
          name: true,
          accessusers: true,
          accessclassific: true,
          accessprospect: true,
        },
      });

      if (!usuario)
        return res.status(403).send({token: "", message: "Usuário ou senha inválidos"});

      const token = jwt.sign(
        {
          userId: usuario.counter,
          accessUsers: usuario.accessusers,
          accessClassification: usuario.accessclassific,
          accessProspect: usuario.accessprospect,
        },
        secret,
        {
          expiresIn: 3600
        }
      );
      
      return res.status(201).json({ auth: true, token: `Bearer ${token}`, user: usuario.name });
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
        .createHmac("sha256", secret)
        .update(req.body.password)
        .digest("base64");

      const { name, password, user } = req.body;

      // Método de criptografia 'base64'
      // new Buffer(password) 'Buffer' está deprecated e incluir new antes do Buffer.alloc ocasiona erro
      /*
        const { name, password, user } = req.body;
        let buff = Buffer.alloc(password); 
        let senha = buff.toString("base64");

      */

      const users = await prisma.tbusers.create({
        data: {
          name,
          password: hash,
          user,
        },
      });

      return res.status(201).json(users);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.tbusers.update({
        data: {
          ...req.body,
        },
        where: { counter: Number(id) },
      });

      if (!user) {
        return res.json({ message: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.tbusers.delete({
        where: { counter: Number(id) },
      });

      if (!user) return res.json({ message: "Usuário não encontrado" });

      return res.status(204).json(user);
    } catch (err) {
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new UsersController();

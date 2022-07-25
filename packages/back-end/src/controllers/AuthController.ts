import { NextFunction, Request, Response } from "express";
import usersController from "./UsersController"


const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.login = async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;

    const hash = crypto.createHmac("sha256", secret).update(password).digest("base64");  

    req.body.password = hash;
  
    const usuario = await usersController.findUserByUserPass;

    if (usuario) {
      const token = jwt.sign(res.json(usuario), secret);
      res.send({ auth: true, token });
    } else {
      res.status(401).send({ auth: false, error: "Nome ou senha inválidos" });
    }
  };
  
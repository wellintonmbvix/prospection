import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "Usuário não autenticado." });

    jwt.verify(token.replace('Bearer ',''), secret, function (err: unknown, decoded: any) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Token não autorizado." });
      
      req.body.counter = decoded.userId;
      next();
    });
    
  };
  
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "QrKgQ320Or4K";

interface TokenPayload {
  id: number;
  email: string;
}

export default function autenticar(req: any, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Token não enviado",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token inválido",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    req.usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Não autorizado",
    });
  }
}

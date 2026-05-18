import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  id: number;
}

export interface AuthRequest extends Request {
  usuarioId?: number;
}

export function autenticarToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não enviado",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    req.usuarioId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}

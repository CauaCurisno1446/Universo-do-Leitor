import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "QrKgQ320Or4K";

function autenticar(req: any, res: Response, next: any) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recebido:", token);

  if (!token) return res.status(401).json({ error: "Não autorizado" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

export default autenticar;

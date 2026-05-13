import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import autenticar from "./middleware/autenticar.js";

const JWT_SECRET = "QrKgQ320Or4K";
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

//GET
app.get("/produtos", async (req: Request, res: Response) => {
  try {
    console.log("QUERY:", req.query);

    const produtos = await prisma.produto.findMany();

    res.json(produtos);
  } catch (error) {
    console.error("ERRO COMPLETO:");
    console.dir(error, { depth: null });

    res.status(500).json({
      error: error instanceof Error ? error.message : error,
    });
  }
});

app.get("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const produto = await prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

app.get("/perfil", autenticar, async (req: any, res: Response) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: req.usuario.id },
    select: { id: true, nome: true, email: true, createdAt: true },
  });
  res.json(usuario);
});

app.get("/sacola", autenticar, async (req: any, res) => {
  const usuarioId = req.usuario.id;
  const sacola = await prisma.sacola.findUnique({
    where: { usuarioId },
    include: { itens: { include: { produto: true } } },
  });
  res.json(sacola);
});

//POST
app.post("/produtos", async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, imagemUrl, categoria } = req.body;

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        imagemUrl,
        categoria,
      },
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

app.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, cpf } = req.body;

    const jaExiste = await prisma.usuario.findUnique({ where: { email } });
    if (jaExiste) return res.status(400).json({ error: "E-mail já cadastrado" });

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, cpf },
    });

    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ error: "E-mail ou senha inválidos" });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ error: "E-mail ou senha inválidos" });

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

//PUT
app.put("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nome, descricao, preco, imagemUrl, categoria } = req.body;

    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: {
        nome,
        descricao,
        preco,
        imagemUrl,
        categoria,
      },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

//DELETE
app.delete("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.produto.delete({
      where: { id },
    });

    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

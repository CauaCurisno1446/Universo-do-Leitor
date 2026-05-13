import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import autenticar from "./middleware/autenticar.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "QrKgQ320Or4K";

app.use(cors());
app.use(express.json());

//GET
app.get("/produtos", async (req: Request, res: Response) => {
  console.log("Buscando produtos...");
  try {
    const produtos = await prisma.produto.findMany();
    const qtdProdutos = produtos.length;
    console.log(`${qtdProdutos} produtos encontrados`);

    return res.json(produtos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar produtos",
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
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    res.json(produto);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar produto",
    });
  }
});

app.get("/perfil", autenticar, async (req: any, res: Response) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: req.usuario.id,
      },

      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        createdAt: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar perfil",
    });
  }
});

app.get("/sacola", autenticar, async (req: any, res: Response) => {
  try {
    const usuarioId = req.usuario.id;

    const sacola = await prisma.sacola.findUnique({
      where: {
        usuarioId,
      },

      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    res.json(sacola);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar sacola",
    });
  }
});

//POST
app.post("/produtos", async (req: Request, res: Response) => {
  try {
    const { nome, descricao, descDetalhada, preco, imagemUrl, categoria, estoque } = req.body;

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        descDetalhada,
        preco: Number(preco),
        imagemUrl,
        categoria,
        estoque: Number(estoque || 0),
      },
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao criar produto",
    });
  }
});

app.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, cpf } = req.body;

    const usuarioExiste = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExiste) {
      return res.status(400).json({
        error: "E-mail já cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        cpf,
      },
    });

    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao cadastrar usuário",
    });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!usuario) {
      return res.status(401).json({
        error: "E-mail ou senha inválidos",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        error: "E-mail ou senha inválidos",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },

      JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,

      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao fazer login",
    });
  }
});

//PUT
app.put("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { nome, descricao, descDetalhada, preco, imagemUrl, categoria, estoque, ativo } = req.body;

    const produtoAtualizado = await prisma.produto.update({
      where: { id },

      data: {
        nome,
        descricao,
        descDetalhada,
        preco: Number(preco),
        imagemUrl,
        categoria,
        estoque: Number(estoque),
        ativo,
      },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao atualizar produto",
    });
  }
});

//DELETE
app.delete("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.produto.delete({
      where: { id },
    });

    res.json({
      message: "Produto deletado com sucesso",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao deletar produto",
    });
  }
});

//SERVIDOR
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

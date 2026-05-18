import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { autenticarToken, AuthRequest } from "./middleware/decoder.js";
import autenticar from "./middleware/autenticar.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "QrKgQ320Or4K";

app.use(cors());
app.use(express.json());

//GET
app.get("/produtos", async (req: Request, res: Response) => {
  try {
    const { precoMin, precoMax, emEstoque, categoria } = req.query;

    const categorias = Array.isArray(categoria) ? categoria : categoria ? [categoria as string] : [];

    const where: any = {
      ativo: true,
    };

    // PREÇO
    if (precoMin || precoMax) {
      where.preco = {
        gte: Number(precoMin) || 0,
        lte: Number(precoMax) || 999999999,
      };
    }

    // ESTOQUE
    if (emEstoque === "true") {
      where.estoque = {
        gt: 0,
      };
    }

    if (emEstoque === "false") {
      where.estoque = {
        lte: 0,
      };
    }

    // CATEGORIAS
    if (categorias.length > 0) {
      where.categoria = {
        in: categorias,
      };
    }

    const produtos = await prisma.produto.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

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

app.get("/perfil", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: req.usuarioId,
      },

      select: {
        id: true,
        nome: true,
        email: true,
        telefones: true,
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

app.get("/favoritos/verificar/:produtoId", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;
    const produtoId = Number(req.params.produtoId);

    const favorito = await prisma.favorito.findFirst({
      where: {
        usuarioId,
        produtoId,
      },
    });

    res.json({
      favoritado: !!favorito,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao verificar favorito",
    });
  }
});

app.get("/favoritos", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;

    const favoritos = await prisma.favorito.findMany({
      where: {
        usuarioId,
      },

      include: {
        produto: true,
      },
    });

    res.json(favoritos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar favoritos",
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
    const { nome, email, senha, cpf, telefones } = req.body;

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
        telefones,
      },
    });

    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      telefones: usuario.telefones,
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

app.post("/favoritos/:produtoId", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;
    const produtoId = Number(req.params.produtoId);

    const favorito = await prisma.favorito.create({
      data: {
        usuarioId,
        produtoId,
      },
    });

    res.json(favorito);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao favoritar produto",
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

app.put("/perfil/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { nome, email, cpf, telefones } = req.body;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },

      data: {
        nome,
        email,
        cpf,
        telefones,
      },
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao atualizar usuário",
    });
  }
});

app.put("/perfil/senha/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { senha } = req.body;

    if (!senha || senha.trim() === "") {
      return res.status(400).json({
        error: "Senha inválida",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await prisma.usuario.update({
      where: { id },
      data: {
        senha: senhaHash,
      },
    });

    res.json({
      mensagem: "Senha atualizada com sucesso",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao atualizar senha",
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

app.delete("/favoritos/:produtoId", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;
    const produtoId = Number(req.params.produtoId);

    await prisma.favorito.deleteMany({
      where: {
        usuarioId,
        produtoId,
      },
    });

    res.json({
      mensagem: "Favorito removido",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao remover favorito",
    });
  }
});

//SERVIDOR
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

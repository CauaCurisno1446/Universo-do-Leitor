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

app.get("/enderecos", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;

    const enderecos = await prisma.endereco.findMany({
      where: {
        usuarioId,
      },
    });

    res.json(enderecos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar endereços",
    });
  }
});

app.get("/sacola", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;

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

app.get("/pedidos", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;

    const pedidos = await prisma.pedido.findMany({
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

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(pedidos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar pedidos",
    });
  }
});

app.get("/pedidos/:id", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;
    const pedidoId = Number(req.params.id);

    const pedido = await prisma.pedido.findFirst({
      where: {
        id: pedidoId,
        usuarioId,
      },

      include: {
        itens: {
          include: {
            produto: true,
          },
        },

        pagamentos: true,
      },
    });

    if (!pedido) {
      return res.status(404).json({
        error: "Pedido não encontrado",
      });
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar pedido",
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

app.post("/enderecos", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;

    const { rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

    const endereco = await prisma.endereco.create({
      data: {
        usuarioId,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
      },
    });

    res.json(endereco);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao cadastrar endereço",
    });
  }
});

app.post("/sacola/adicionar", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;

    const { produtoId, quantidade } = req.body;

    let sacola = await prisma.sacola.findUnique({
      where: {
        usuarioId,
      },
    });

    if (!sacola) {
      sacola = await prisma.sacola.create({
        data: {
          usuarioId,
        },
      });
    }

    const itemExistente = await prisma.sacolaItem.findFirst({
      where: {
        sacolaId: sacola.id,
        produtoId,
      },
    });

    if (itemExistente) {
      const itemAtualizado = await prisma.sacolaItem.update({
        where: {
          id: itemExistente.id,
        },

        data: {
          quantidade: itemExistente.quantidade + quantidade,
        },
      });

      return res.json(itemAtualizado);
    }

    const novoItem = await prisma.sacolaItem.create({
      data: {
        sacolaId: sacola.id,
        produtoId,
        quantidade,
      },
    });

    res.json(novoItem);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao adicionar item na sacola",
    });
  }
});

app.post("/pedido/finalizar", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarioId = req.usuarioId!;

    const { metodoPagamento, enderecoId } = req.body;

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

    if (!sacola || sacola.itens.length === 0) {
      return res.status(400).json({
        error: "Sacola vazia",
      });
    }

    const endereco = await prisma.endereco.findFirst({
      where: {
        id: enderecoId,
        usuarioId,
      },
    });

    if (!endereco) {
      return res.status(404).json({
        error: "Endereço não encontrado",
      });
    }

    const total = sacola.itens.reduce((acc, item) => {
      return acc + item.produto.preco * item.quantidade;
    }, 0);

    const pedido = await prisma.pedido.create({
      data: {
        usuarioId,

        status: "PENDENTE",

        total,

        enderecoEntrega: `
${endereco.rua}, ${endereco.numero}
${endereco.bairro}
${endereco.cidade}/${endereco.estado}
CEP: ${endereco.cep}
        `,

        itens: {
          create: sacola.itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            preco: item.produto.preco,
          })),
        },
      },

      include: {
        itens: true,
      },
    });

    await prisma.pagamento.create({
      data: {
        usuarioId,
        pedidoId: pedido.id,
        metodo: metodoPagamento,
        status: "PENDENTE",
      },
    });

    for (const item of sacola.itens) {
      await prisma.produto.update({
        where: {
          id: item.produtoId,
        },

        data: {
          estoque: {
            decrement: item.quantidade,
          },
        },
      });
    }

    await prisma.sacolaItem.deleteMany({
      where: {
        sacolaId: sacola.id,
      },
    });

    res.json({
      success: true,
      pedido,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao finalizar pedido",
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

app.put("/sacola/item/:id", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const itemId = Number(req.params.id);

    const { quantidade } = req.body;

    if (quantidade <= 0) {
      await prisma.sacolaItem.delete({
        where: {
          id: itemId,
        },
      });

      return res.json({
        removido: true,
      });
    }

    const itemAtualizado = await prisma.sacolaItem.update({
      where: {
        id: itemId,
      },

      data: {
        quantidade,
      },
    });

    res.json(itemAtualizado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao atualizar quantidade",
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

app.delete("/sacola/item/:id", autenticarToken, async (req: AuthRequest, res: Response) => {
  try {
    const itemId = Number(req.params.id);

    await prisma.sacolaItem.delete({
      where: {
        id: itemId,
      },
    });

    res.json({
      mensagem: "Item removido",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao remover item",
    });
  }
});

//SERVIDOR
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())

//GET
app.get("/produtos", async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany()
    res.json(produtos)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" })
  }
})

app.get("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const produto = await prisma.produto.findUnique({
      where: { id }
    })

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" })
    }

    res.json(produto)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" })
  }
})


//POST 
app.post("/produtos", async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, imagemUrl, categoria } = req.body

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        imagemUrl,
        categoria
      }
    })

    res.status(201).json(novoProduto)
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" })
  }
})

//PUT 
app.put("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, descricao, preco, imagemUrl, categoria } = req.body

    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: {
        nome,
        descricao,
        preco,
        imagemUrl,
        categoria
      }
    })

    res.json(produtoAtualizado)
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto" })
  }
})

//DELETE
app.delete("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    await prisma.produto.delete({
      where: { id }
    })

    res.json({ message: "Produto deletado com sucesso" })
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto" })
  }
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
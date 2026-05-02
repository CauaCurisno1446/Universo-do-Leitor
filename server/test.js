import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main() {
  await prisma.produto.createMany({
    data: [
      {
        nome: "O Hobbit",
        descricao: "Clássico de fantasia de J.R.R. Tolkien",
        preco: 39.90,
        imagemUrl: "https://m.media-amazon.com/images/I/81t2CVWEsUL.jpg",
        categoria: "Livros"
      },
      {
        nome: "1984",
        descricao: "Distopia escrita por George Orwell",
        preco: 29.90,
        imagemUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
        categoria: "Livros"
      },
      {
        nome: "Marca Página Magnético",
        descricao: "Kit com 5 marca páginas magnéticos",
        preco: 14.90,
        imagemUrl: "https://via.placeholder.com/150",
        categoria: "Acessórios"
      },
      {
        nome: "Luminária de Leitura LED",
        descricao: "Luminária portátil para leitura noturna",
        preco: 49.90,
        imagemUrl: "https://via.placeholder.com/150",
        categoria: "Acessórios"
      },
      {
        nome: "Box Harry Potter",
        descricao: "Coleção completa com 7 livros",
        preco: 199.90,
        imagemUrl: "https://m.media-amazon.com/images/I/91HHqVTAJQL.jpg",
        categoria: "Livros"
      }
    ]
  })

  console.log("✅ Produtos cadastrados com sucesso!")
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
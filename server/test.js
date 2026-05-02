import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main() {
  await prisma.produto.createMany({
  data: [
    {
      nome: "Dom Casmurro",
      descricao: "Clássico da literatura brasileira de Machado de Assis",
      preco: 24.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "A Revolução dos Bichos",
      descricao: "Sátira política escrita por George Orwell",
      preco: 19.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Capas Protetoras para Livros",
      descricao: "Kit com capas transparentes para proteção",
      preco: 22.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "Suporte para Livro Ajustável",
      descricao: "Suporte ergonômico para leitura confortável",
      preco: 39.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "Crime e Castigo",
      descricao: "Romance psicológico de Dostoiévski",
      preco: 34.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Orgulho e Preconceito",
      descricao: "Romance clássico de Jane Austen",
      preco: 27.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Kit Marca Texto Pastel",
      descricao: "Conjunto de marca textos suaves para leitura",
      preco: 18.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "Ilíada",
      descricao: "Obra épica de Homero",
      preco: 31.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Odisseia",
      descricao: "Continuação da saga épica de Homero",
      preco: 31.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Abajur de Leitura USB",
      descricao: "Luminária compacta com conexão USB",
      preco: 44.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "O Pequeno Príncipe",
      descricao: "Clássico de Antoine de Saint-Exupéry",
      preco: 21.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Caderno de Leitura",
      descricao: "Caderno para anotações literárias",
      preco: 16.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "Drácula",
      descricao: "Clássico do terror de Bram Stoker",
      preco: 28.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Frankenstein",
      descricao: "Romance gótico de Mary Shelley",
      preco: 26.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Suporte de Página",
      descricao: "Acessório para manter o livro aberto com uma mão",
      preco: 12.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "A Metamorfose",
      descricao: "Obra marcante de Franz Kafka",
      preco: 23.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "O Morro dos Ventos Uivantes",
      descricao: "Romance clássico de Emily Brontë",
      preco: 29.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Kit Marcadores Coloridos",
      descricao: "Marcadores adesivos para destacar páginas",
      preco: 13.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "A Divina Comédia",
      descricao: "Poema épico de Dante Alighieri",
      preco: 45.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Hamlet",
      descricao: "Tragédia clássica de William Shakespeare",
      preco: 25.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Organizador de Livros",
      descricao: "Suporte para organizar livros na estante",
      preco: 34.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "O Conde de Monte Cristo",
      descricao: "Romance de aventura de Alexandre Dumas",
      preco: 37.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Relógio de Mesa Literário",
      descricao: "Relógio decorativo inspirado em livros",
      preco: 54.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
    },
    {
      nome: "Anna Karenina",
      descricao: "Romance clássico de Tolstói",
      preco: 39.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Livros"
    },
    {
      nome: "Kit Iluminação para Leitura",
      descricao: "Luz portátil recarregável para leitura",
      preco: 42.90,
      imagemUrl: "https://via.placeholder.com/150",
      categoria: "Acessórios"
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
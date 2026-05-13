const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const produtos = [
    {
      nome: "O Hobbit",
      descricao: "Clássico de fantasia de J.R.R. Tolkien",
      descDetalhada:
        "O Hobbit é uma das obras mais importantes da literatura fantástica e acompanha Bilbo Bolseiro em uma aventura inesperada pela Terra Média. Ao lado de anões e do mago Gandalf, Bilbo enfrenta criaturas perigosas, descobre tesouros escondidos e aprende mais sobre coragem, amizade e superação. A narrativa mistura momentos leves e divertidos com cenas intensas e emocionantes, criando uma experiência envolvente para leitores de todas as idades. Esta edição apresenta excelente acabamento, ótima diagramação e uma leitura confortável, sendo ideal tanto para novos leitores quanto para colecionadores apaixonados pelo universo criado por Tolkien.",
      preco: 5990,
      imagemUrl: "https://m.media-amazon.com/images/I/81aA7hEEykL.jpg",
      categoria: "Livros",
      estoque: 15,
    },

    {
      nome: "1984",
      descricao: "Distopia clássica de George Orwell",
      descDetalhada:
        "1984 apresenta um futuro sombrio onde um governo totalitário controla completamente a vida das pessoas através de vigilância constante, manipulação da verdade e censura absoluta. Acompanhamos Winston Smith em sua luta silenciosa contra o sistema opressor comandado pelo Grande Irmão. A obra aborda temas extremamente atuais como privacidade, liberdade, propaganda e controle social, permanecendo relevante mesmo décadas após sua publicação. Esta edição oferece excelente qualidade de impressão e acabamento refinado, sendo indispensável para fãs de literatura reflexiva e impactante.",
      preco: 4590,
      imagemUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
      categoria: "Livros",
      estoque: 12,
    },

    {
      nome: "Harry Potter e a Pedra Filosofal",
      descricao: "O início da jornada do jovem bruxo",
      descDetalhada:
        "O primeiro livro da série Harry Potter apresenta o universo mágico de Hogwarts de maneira encantadora e inesquecível. Harry descobre que é um bruxo e embarca em uma aventura cheia de amizades, mistérios e perigos ao lado de Rony e Hermione. A obra combina fantasia, emoção e humor em uma narrativa envolvente que marcou gerações ao redor do mundo. Esta edição possui acabamento premium, excelente diagramação e é perfeita para fãs de fantasia e colecionadores da saga.",
      preco: 6990,
      imagemUrl: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg",
      categoria: "Livros",
      estoque: 20,
    },

    {
      nome: "Duna",
      descricao: "Uma das maiores obras de ficção científica",
      descDetalhada:
        "Duna é uma obra monumental da ficção científica que mistura política, religião, ecologia e conflitos interplanetários em uma narrativa extremamente rica e detalhada. A história acompanha Paul Atreides em sua jornada pelo planeta desértico Arrakis, local da substância mais valiosa do universo. O livro apresenta personagens complexos, disputas intensas e um universo fascinante que influenciou inúmeras obras modernas do gênero. Uma leitura obrigatória para fãs de ficção científica épica.",
      preco: 7590,
      imagemUrl: "https://m.media-amazon.com/images/I/91A24c3zRLL.jpg",
      categoria: "Livros",
      estoque: 10,
    },

    {
      nome: "Percy Jackson",
      descricao: "Fantasia inspirada na mitologia grega",
      descDetalhada:
        "Percy Jackson apresenta uma aventura moderna baseada na mitologia grega, acompanhando um garoto que descobre ser filho de Poseidon. A narrativa mistura ação, humor e criaturas mitológicas em uma jornada extremamente divertida e emocionante. O livro é perfeito para jovens leitores e fãs de fantasia que procuram uma leitura dinâmica e envolvente. Esta edição conta com ótima qualidade gráfica e acabamento resistente.",
      preco: 4990,
      imagemUrl: "https://m.media-amazon.com/images/I/91MoJbB3KSL.jpg",
      categoria: "Livros",
      estoque: 18,
    },

    // ACESSÓRIOS

    {
      nome: "Marcador Magnético Premium",
      descricao: "Marcador elegante para livros",
      descDetalhada:
        "O Marcador Magnético Premium foi desenvolvido especialmente para leitores que desejam praticidade, organização e estilo durante suas leituras diárias. Fabricado com materiais resistentes e acabamento refinado, ele utiliza ímãs internos que mantêm o marcador preso à página sem danificar o papel. Seu design moderno combina perfeitamente com livros, agendas e planners, proporcionando uma experiência de leitura mais confortável e organizada. Compacto e leve, é ideal para leitores frequentes e estudantes.",
      preco: 1990,
      imagemUrl: "https://m.media-amazon.com/images/I/51-+423DPrL._AC_SX679_.jpg",
      categoria: "Acessórios",
      estoque: 40,
    },

    {
      nome: "Suporte para Livro Ajustável",
      descricao: "Conforto durante longas leituras",
      descDetalhada:
        "O suporte ajustável para livros oferece mais conforto e ergonomia para leitores, estudantes e profissionais que passam longos períodos lendo ou estudando. Com estrutura resistente e regulagem de inclinação, ele ajuda a reduzir dores no pescoço e melhora a postura durante a leitura. Seu design compacto permite fácil transporte e armazenamento, sendo ideal para mesas de estudo, escritórios e bibliotecas pessoais.",
      preco: 5990,
      imagemUrl: "https://m.media-amazon.com/images/I/61DYLoyNRWL.jpg",
      categoria: "Acessórios",
      estoque: 15,
    },

    {
      nome: "Capa Protetora para Kindle",
      descricao: "Proteção elegante para e-reader",
      descDetalhada:
        "Esta capa protetora para Kindle combina segurança, praticidade e elegância em um único acessório. Fabricada com material resistente e acabamento premium, protege o dispositivo contra riscos, impactos leves e sujeira do dia a dia. O interior macio evita danos à tela e garante mais durabilidade ao aparelho. Além disso, seu design moderno proporciona uma pegada confortável e sofisticada para leitores digitais.",
      preco: 8990,
      imagemUrl: "https://m.media-amazon.com/images/I/71nK8JbJ0lL.jpg",
      categoria: "Acessórios",
      estoque: 12,
    },

    {
      nome: "Organizador de Livros",
      descricao: "Decoração e organização para estantes",
      descDetalhada:
        "O organizador de livros é perfeito para manter sua estante organizada com estilo e praticidade. Produzido em material resistente e acabamento elegante, ajuda a sustentar livros de diferentes tamanhos sem deixá-los cair ou desalinhados. Além da funcionalidade, também funciona como peça decorativa para quartos, escritórios e bibliotecas pessoais. Uma excelente escolha para amantes de leitura e decoração minimalista.",
      preco: 7990,
      imagemUrl: "https://m.media-amazon.com/images/I/71N6mN9mJ-L.jpg",
      categoria: "Acessórios",
      estoque: 8,
    },

    {
      nome: "Bolsa para Livros Impermeável",
      descricao: "Transporte seguro para livros",
      descDetalhada:
        "A bolsa impermeável para livros foi criada pensando em leitores que gostam de carregar seus livros com segurança para qualquer lugar. Seu material resistente protege contra chuva, poeira e pequenos impactos, garantindo mais durabilidade aos seus itens. Possui espaço interno amplo e confortável, permitindo transportar livros, cadernos, tablets e acessórios com facilidade.",
      preco: 10990,
      imagemUrl: "https://m.media-amazon.com/images/I/71l4M0H0fJL.jpg",
      categoria: "Acessórios",
      estoque: 11,
    },

    // LUMINÁRIAS

    {
      nome: "Luminária LED de Mesa",
      descricao: "Iluminação confortável para leitura",
      descDetalhada:
        "A luminária LED de mesa oferece iluminação confortável e eficiente para leitura, estudos e trabalho. Seu sistema de luz suave reduz o cansaço visual e proporciona uma experiência agradável durante longos períodos de uso. O design moderno combina facilmente com qualquer ambiente, enquanto a estrutura ajustável permite direcionar a luz conforme necessário. Ideal para leitores, estudantes e profissionais.",
      preco: 8990,
      imagemUrl: "https://m.media-amazon.com/images/I/61mKveQpH-L.jpg",
      categoria: "Luminárias",
      estoque: 14,
    },

    {
      nome: "Luminária Clip para Livro",
      descricao: "Leitura confortável em qualquer lugar",
      descDetalhada:
        "A luminária clip para livro é prática, compacta e perfeita para quem gosta de ler à noite sem incomodar outras pessoas. Seu sistema de presilha permite fixação fácil diretamente no livro ou mesa, enquanto a iluminação LED oferece claridade eficiente sem cansar os olhos. Leve e portátil, pode ser transportada facilmente em mochilas e bolsas.",
      preco: 3990,
      imagemUrl: "https://m.media-amazon.com/images/I/61V4h0Zq3EL.jpg",
      categoria: "Luminárias",
      estoque: 22,
    },

    {
      nome: "Luminária RGB Gamer",
      descricao: "Decoração moderna para leitores",
      descDetalhada:
        "A luminária RGB gamer adiciona estilo e personalidade ao ambiente de leitura ou estudo. Com múltiplas opções de cores e efeitos de iluminação, ela cria uma atmosfera aconchegante e moderna para quartos, escritórios e setups. Além do visual sofisticado, oferece iluminação confortável para leitura noturna e decoração temática.",
      preco: 12990,
      imagemUrl: "https://m.media-amazon.com/images/I/61xQX9Yxw-L.jpg",
      categoria: "Luminárias",
      estoque: 9,
    },
  ];

  // DUPLICA PRODUTOS ATÉ CHEGAR EM 50
  while (produtos.length < 50) {
    const base = produtos[produtos.length % 12];

    produtos.push({
      ...base,
      nome: `${base.nome} ${produtos.length + 1}`,
    });
  }

  await prisma.produto.createMany({
    data: produtos,
  });

  console.log("50 produtos cadastrados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

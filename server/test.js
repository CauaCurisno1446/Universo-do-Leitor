const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const produtos = [
    // LIVROS (20)
    {
      nome: "O Hobbit",
      descricao: "Clássico de fantasia de J.R.R. Tolkien",
      descDetalhada:
        "O Hobbit acompanha Bilbo Bolseiro em uma aventura inesperada pela Terra Média ao lado de anões e do mago Gandalf. Uma narrativa envolvente que mistura momentos leves com cenas intensas, ideal para leitores de todas as idades.",
      preco: 5990,
      imagemUrl: "https://m.media-amazon.com/images/I/81aA7hEEykL.jpg",
      categoria: "Livros",
      estoque: 15,
    },
    {
      nome: "1984",
      descricao: "Distopia clássica de George Orwell",
      descDetalhada:
        "Um futuro sombrio onde o governo totalitário controla completamente a vida das pessoas. Winston Smith luta silenciosamente contra o sistema opressor do Grande Irmão. Leitura essencial sobre liberdade, vigilância e controle social.",
      preco: 4590,
      imagemUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
      categoria: "Livros",
      estoque: 12,
    },
    {
      nome: "Harry Potter e a Pedra Filosofal",
      descricao: "O início da jornada do jovem bruxo",
      descDetalhada:
        "Harry descobre que é um bruxo e embarca em uma aventura mágica em Hogwarts ao lado de Rony e Hermione. O começo de uma das sagas mais amadas da literatura mundial.",
      preco: 6990,
      imagemUrl: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg",
      categoria: "Livros",
      estoque: 20,
    },
    {
      nome: "Duna",
      descricao: "Uma das maiores obras de ficção científica",
      descDetalhada:
        "Paul Atreides embarca em uma jornada épica pelo planeta desértico Arrakis, lar da substância mais valiosa do universo. Política, religião e ecologia se misturam nessa obra monumental do gênero.",
      preco: 7590,
      imagemUrl: "https://m.media-amazon.com/images/I/91A24c3zRLL.jpg",
      categoria: "Livros",
      estoque: 10,
    },
    {
      nome: "Percy Jackson e o Ladrão de Raios",
      descricao: "Fantasia inspirada na mitologia grega",
      descDetalhada:
        "Percy descobre ser filho de Poseidon e precisa recuperar o raio roubado de Zeus para evitar uma guerra entre os deuses. Uma aventura moderna cheia de humor e ação.",
      preco: 4990,
      imagemUrl: "https://m.media-amazon.com/images/I/91MoJbB3KSL.jpg",
      categoria: "Livros",
      estoque: 18,
    },
    {
      nome: "O Senhor dos Anéis: A Sociedade do Anel",
      descricao: "A épica jornada para destruir o Um Anel",
      descDetalhada:
        "Frodo Bolseiro herda o Um Anel e parte em uma perigosa missão para destruí-lo nas chamas da Montanha da Perdição. A obra que definiu o gênero fantasia moderna.",
      preco: 8990,
      imagemUrl: "https://m.media-amazon.com/images/I/71jLBXtWJWL.jpg",
      categoria: "Livros",
      estoque: 9,
    },
    {
      nome: "A Revolução dos Bichos",
      descricao: "Fábula política de George Orwell",
      descDetalhada:
        "Os animais de uma fazenda se rebelam contra seus donos humanos em busca de liberdade e igualdade. Uma alegoria brilhante sobre poder, corrupção e traição que permanece atualíssima.",
      preco: 3490,
      imagemUrl: "https://m.media-amazon.com/images/I/71FJFiEjqoL.jpg",
      categoria: "Livros",
      estoque: 22,
    },
    {
      nome: "O Alquimista",
      descricao: "Fábula sobre seguir os sonhos",
      descDetalhada:
        "Santiago, um jovem pastor andaluz, parte em busca de um tesouro e descobre que a maior riqueza está na própria jornada. O best-seller de Paulo Coelho traduzido em mais de 80 idiomas.",
      preco: 3990,
      imagemUrl: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
      categoria: "Livros",
      estoque: 25,
    },
    {
      nome: "Dom Quixote",
      descricao: "O clássico de Cervantes",
      descDetalhada:
        "O fidalgo Alonso Quijano enlouquece de tanto ler livros de cavalaria e sai pelo mundo como Dom Quixote de La Mancha em busca de aventuras. Um dos maiores clássicos da literatura ocidental.",
      preco: 6490,
      imagemUrl: "https://m.media-amazon.com/images/I/71GNqqXuN3L.jpg",
      categoria: "Livros",
      estoque: 7,
    },
    {
      nome: "Sapiens",
      descricao: "Uma breve história da humanidade",
      descDetalhada:
        "Yuval Noah Harari conduz uma viagem fascinante pela história da humanidade, desde os primeiros humanos até o mundo moderno. Um livro que muda a forma de enxergar o mundo.",
      preco: 6990,
      imagemUrl: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
      categoria: "Livros",
      estoque: 16,
    },
    {
      nome: "O Pequeno Príncipe",
      descricao: "Clássico atemporal de Antoine de Saint-Exupéry",
      descDetalhada:
        "Um piloto perdido no deserto encontra um pequeno príncipe vindo de outro planeta. Uma história poética e filosófica sobre amizade, amor e o que realmente importa na vida.",
      preco: 2990,
      imagemUrl: "https://m.media-amazon.com/images/I/71OZY035QKL.jpg",
      categoria: "Livros",
      estoque: 30,
    },
    {
      nome: "Cem Anos de Solidão",
      descricao: "Realismo mágico de Gabriel García Márquez",
      descDetalhada:
        "A saga da família Buendía na cidade fictícia de Macondo ao longo de sete gerações. Uma obra-prima do realismo mágico e um dos romances mais importantes do século XX.",
      preco: 5490,
      imagemUrl: "https://m.media-amazon.com/images/I/81PA5cTQDRL.jpg",
      categoria: "Livros",
      estoque: 11,
    },
    {
      nome: "Admirável Mundo Novo",
      descricao: "Distopia futurista de Aldous Huxley",
      descDetalhada:
        "Em um futuro onde as pessoas são condicionadas para a felicidade desde o nascimento, um homem selvagem questiona os valores dessa sociedade perfeita. Uma distopia brilhante e perturbadora.",
      preco: 4290,
      imagemUrl: "https://m.media-amazon.com/images/I/81K3QSzFBZL.jpg",
      categoria: "Livros",
      estoque: 13,
    },
    {
      nome: "Jogos Vorazes",
      descricao: "Distopia jovem adulto de Suzanne Collins",
      descDetalhada:
        "Em Panem, jovens são obrigados a lutar até a morte em jogos televisionados. Katniss Everdeen se voluntaria no lugar de sua irmã e se torna símbolo de resistência. Ação e emoção do início ao fim.",
      preco: 4990,
      imagemUrl: "https://m.media-amazon.com/images/I/71un2hMhv9L.jpg",
      categoria: "Livros",
      estoque: 19,
    },
    {
      nome: "It: A Coisa",
      descricao: "Terror psicológico de Stephen King",
      descDetalhada:
        "Um grupo de amigos enfrenta um ser maligno que aterroriza a cidade de Derry assumindo a forma dos maiores medos de cada um. O maior clássico do terror moderno.",
      preco: 7990,
      imagemUrl: "https://m.media-amazon.com/images/I/71tFhdcIgxL.jpg",
      categoria: "Livros",
      estoque: 8,
    },
    {
      nome: "O Nome do Vento",
      descricao: "Fantasia épica de Patrick Rothfuss",
      descDetalhada:
        "Kvothe, o lendário mago, conta sua própria história em três dias. Uma narrativa densa e envolvente sobre magia, música e busca por identidade que conquistou leitores ao redor do mundo.",
      preco: 6590,
      imagemUrl: "https://m.media-amazon.com/images/I/91vO5PdkFHL.jpg",
      categoria: "Livros",
      estoque: 10,
    },
    {
      nome: "A Menina que Roubava Livros",
      descricao: "Drama histórico na Segunda Guerra Mundial",
      descDetalhada:
        "Liesel Meminger rouba livros na Alemanha nazista enquanto a morte narra sua história. Um relato emocionante sobre o poder das palavras em meio ao horror da guerra.",
      preco: 4790,
      imagemUrl: "https://m.media-amazon.com/images/I/81b5WOdY9bL.jpg",
      categoria: "Livros",
      estoque: 14,
    },
    {
      nome: "O Código Da Vinci",
      descricao: "Thriller de Robert Langdon por Dan Brown",
      descDetalhada:
        "Robert Langdon é chamado para investigar um assassinato no Louvre e acaba descobrindo uma conspiração histórica envolvendo a Igreja e um segredo guardado por séculos. Suspense do início ao fim.",
      preco: 4490,
      imagemUrl: "https://m.media-amazon.com/images/I/815+QbGxKlL.jpg",
      categoria: "Livros",
      estoque: 17,
    },
    {
      nome: "Sherlock Holmes: Aventuras",
      descricao: "Contos do detetive de Arthur Conan Doyle",
      descDetalhada:
        "Coletânea dos melhores casos de Sherlock Holmes e Dr. Watson. Mistérios inteligentes, dedução precisa e a dupla mais famosa da literatura policial em suas aventuras mais marcantes.",
      preco: 3990,
      imagemUrl: "https://m.media-amazon.com/images/I/71YnrJhSSHL.jpg",
      categoria: "Livros",
      estoque: 20,
    },
    {
      nome: "O Guia do Mochileiro das Galáxias",
      descricao: "Ficção científica cômica de Douglas Adams",
      descDetalhada:
        "Arthur Dent é o único sobrevivente da destruição da Terra para dar lugar a uma autoestrada intergaláctica. Uma aventura absurda e hilária pelo universo que se tornou cult.",
      preco: 4290,
      imagemUrl: "https://m.media-amazon.com/images/I/81XSN3hA5gL.jpg",
      categoria: "Livros",
      estoque: 12,
    },

    // ACESSÓRIOS (15)
    {
      nome: "Marcador Magnético Premium",
      descricao: "Marcador elegante para livros",
      descDetalhada:
        "Fabricado com materiais resistentes e acabamento refinado, utiliza ímãs internos que mantêm o marcador preso à página sem danificar o papel. Design moderno para leitores exigentes.",
      preco: 1990,
      imagemUrl: "https://m.media-amazon.com/images/I/51-+423DPrL._AC_SX679_.jpg",
      categoria: "Acessórios",
      estoque: 40,
    },
    {
      nome: "Suporte para Livro Ajustável",
      descricao: "Conforto durante longas leituras",
      descDetalhada:
        "Estrutura resistente com regulagem de inclinação que reduz dores no pescoço e melhora a postura durante a leitura. Compacto e fácil de transportar.",
      preco: 5990,
      imagemUrl: "https://m.media-amazon.com/images/I/61DYLoyNRWL.jpg",
      categoria: "Acessórios",
      estoque: 15,
    },
    {
      nome: "Capa Protetora para Kindle",
      descricao: "Proteção elegante para e-reader",
      descDetalhada:
        "Material resistente com acabamento premium protege o dispositivo contra riscos e impactos. Interior macio evita danos à tela e garante mais durabilidade ao aparelho.",
      preco: 8990,
      imagemUrl: "https://m.media-amazon.com/images/I/71nK8JbJ0lL.jpg",
      categoria: "Acessórios",
      estoque: 12,
    },
    {
      nome: "Organizador de Livros",
      descricao: "Decoração e organização para estantes",
      descDetalhada:
        "Produzido em material resistente, ajuda a sustentar livros de diferentes tamanhos sem deixá-los cair. Funciona também como peça decorativa minimalista para estantes.",
      preco: 7990,
      imagemUrl: "https://m.media-amazon.com/images/I/71N6mN9mJ-L.jpg",
      categoria: "Acessórios",
      estoque: 8,
    },
    {
      nome: "Bolsa para Livros Impermeável",
      descricao: "Transporte seguro para livros",
      descDetalhada:
        "Material resistente protege contra chuva, poeira e pequenos impactos. Espaço interno amplo para livros, cadernos, tablets e acessórios.",
      preco: 10990,
      imagemUrl: "https://m.media-amazon.com/images/I/71l4M0H0fJL.jpg",
      categoria: "Acessórios",
      estoque: 11,
    },
    {
      nome: "Kit de Canetas Coloridas",
      descricao: "Perfeito para anotações e estudos",
      descDetalhada:
        "Kit com 24 canetas coloridas de ponta fina, ideais para anotações em livros, cadernos e planners. Tinta de alta qualidade que não borra nem mancha o papel.",
      preco: 3490,
      imagemUrl: "https://m.media-amazon.com/images/I/71o2RppTUML.jpg",
      categoria: "Acessórios",
      estoque: 35,
    },
    {
      nome: "Caderno de Anotações A5",
      descricao: "Para registrar suas leituras",
      descDetalhada:
        "Caderno de capa dura no formato A5 com 200 páginas de papel pautado de alta qualidade. Ideal para diário de leitura, anotações e resenhas dos seus livros favoritos.",
      preco: 2990,
      imagemUrl: "https://m.media-amazon.com/images/I/71L5SuiCeBL.jpg",
      categoria: "Acessórios",
      estoque: 28,
    },
    {
      nome: "Post-its Coloridos Grandes",
      descricao: "Marcações práticas para qualquer livro",
      descDetalhada:
        "Pacote com 200 post-its em 4 cores, ideais para marcar páginas, anotar ideias e destacar trechos importantes sem danificar o livro. Adesivo reposicionável de alta qualidade.",
      preco: 1590,
      imagemUrl: "https://m.media-amazon.com/images/I/71xR1n3ZnAL.jpg",
      categoria: "Acessórios",
      estoque: 50,
    },
    {
      nome: "Caneta Marca-texto 6 Cores",
      descricao: "Destaque o que importa",
      descDetalhada:
        "Kit com 6 marca-textos em cores vibrantes, ponta dupla (fina e grossa) e tinta que não sangra no papel. Essencial para estudantes e leitores atentos.",
      preco: 1990,
      imagemUrl: "https://m.media-amazon.com/images/I/61jmXnOsJaL.jpg",
      categoria: "Acessórios",
      estoque: 45,
    },
    {
      nome: "Capa de Tecido para Livro",
      descricao: "Proteção elegante e reutilizável",
      descDetalhada:
        "Capa de tecido lavável que protege qualquer livro do tamanho padrão. Design floral delicado disponível em várias estampas. Presenteável e funcional.",
      preco: 2490,
      imagemUrl: "https://m.media-amazon.com/images/I/71bEFxZiDML.jpg",
      categoria: "Acessórios",
      estoque: 23,
    },
    {
      nome: "Almofada de Leitura",
      descricao: "Conforto total para longas sessões",
      descDetalhada:
        "Almofada ergonômica com suporte para braços e encosto ajustável, ideal para leituras prolongadas na cama ou sofá. Enchimento de espuma de alta densidade.",
      preco: 13990,
      imagemUrl: "https://m.media-amazon.com/images/I/61ikAHq-eeL.jpg",
      categoria: "Acessórios",
      estoque: 10,
    },
    {
      nome: "Régua de Leitura Magnética",
      descricao: "Acompanhe cada linha sem se perder",
      descDetalhada:
        "Régua magnética que facilita a leitura linha por linha, evitando que os olhos se percam no texto. Ideal para leitores com dislexia ou dificuldade de concentração.",
      preco: 990,
      imagemUrl: "https://m.media-amazon.com/images/I/61HjijQv5nL.jpg",
      categoria: "Acessórios",
      estoque: 60,
    },
    {
      nome: "Planner de Leituras 2025",
      descricao: "Organize sua lista de leitura",
      descDetalhada:
        "Planner temático para leitores com espaços para metas anuais, resenhas mensais, listas de desejados e frases favoritas. 180 páginas em papel offset 90g.",
      preco: 4490,
      imagemUrl: "https://m.media-amazon.com/images/I/71P4s9WXMRL.jpg",
      categoria: "Acessórios",
      estoque: 17,
    },
    {
      nome: "Lupa com LED",
      descricao: "Leitura confortável para letras pequenas",
      descDetalhada:
        "Lupa de alta qualidade com ampliação 3x e iluminação LED integrada. Ideal para leituras de mapas, letras miúdas e textos antigos. Funciona com pilhas AAA.",
      preco: 3290,
      imagemUrl: "https://m.media-amazon.com/images/I/71q6DRN5KJL.jpg",
      categoria: "Acessórios",
      estoque: 20,
    },
    {
      nome: "Porta-livros de Bambu",
      descricao: "Sustentável e elegante",
      descDetalhada:
        "Suporte para livros fabricado em bambu natural, material sustentável e resistente. Design minimalista que combina com qualquer decoração. Capacidade para até 15 livros.",
      preco: 6990,
      imagemUrl: "https://m.media-amazon.com/images/I/61f4YjX2ySL.jpg",
      categoria: "Acessórios",
      estoque: 13,
    },

    // LUMINÁRIAS (15)
    {
      nome: "Luminária LED de Mesa",
      descricao: "Iluminação confortável para leitura",
      descDetalhada:
        "Sistema de luz suave que reduz o cansaço visual durante longas sessões. Design moderno com estrutura ajustável para direcionar a luz conforme necessário.",
      preco: 8990,
      imagemUrl: "https://m.media-amazon.com/images/I/61mKveQpH-L.jpg",
      categoria: "Luminárias",
      estoque: 14,
    },
    {
      nome: "Luminária Clip para Livro",
      descricao: "Leitura confortável em qualquer lugar",
      descDetalhada:
        "Sistema de presilha para fixação direta no livro ou mesa. Iluminação LED eficiente sem cansar os olhos. Leve, portátil e perfeita para leituras noturnas.",
      preco: 3990,
      imagemUrl: "https://m.media-amazon.com/images/I/61V4h0Zq3EL.jpg",
      categoria: "Luminárias",
      estoque: 22,
    },
    {
      nome: "Luminária RGB Gamer",
      descricao: "Decoração moderna para leitores",
      descDetalhada:
        "Múltiplas opções de cores e efeitos de iluminação para criar uma atmosfera moderna. Iluminação confortável para leitura noturna com visual sofisticado.",
      preco: 12990,
      imagemUrl: "https://m.media-amazon.com/images/I/61xQX9Yxw-L.jpg",
      categoria: "Luminárias",
      estoque: 9,
    },
    {
      nome: "Luminária de Piso para Leitura",
      descricao: "Iluminação de alto alcance",
      descDetalhada:
        "Luminária de piso com haste regulável de até 1,5m e cabeçote articulável. Lâmpada LED de 12W com luz quente que proporciona iluminação ampla e confortável para poltronas e sofás.",
      preco: 18990,
      imagemUrl: "https://m.media-amazon.com/images/I/61W5+4eSi3L.jpg",
      categoria: "Luminárias",
      estoque: 6,
    },
    {
      nome: "Luminária de Cabeceira Touch",
      descricao: "Controle por toque, 3 tons de luz",
      descDetalhada:
        "Luminária compacta com sensor touch que alterna entre luz quente, neutra e fria. Perfeita para cabeceira, com base antiderrapante e cabo USB para carregamento.",
      preco: 7490,
      imagemUrl: "https://m.media-amazon.com/images/I/51wBJPM7GjL.jpg",
      categoria: "Luminárias",
      estoque: 18,
    },
    {
      nome: "Luminária Solar de Jardim",
      descricao: "Ecológica e sem fio",
      descDetalhada:
        "Carrega durante o dia com energia solar e ilumina automaticamente à noite. Resistente à água e intempéries, ideal para jardins, varandas e áreas externas.",
      preco: 5490,
      imagemUrl: "https://m.media-amazon.com/images/I/71lX-jXhGhL.jpg",
      categoria: "Luminárias",
      estoque: 24,
    },
    {
      nome: "Abajur Vintage para Mesa",
      descricao: "Charme retrô para sua decoração",
      descDetalhada:
        "Abajur estilo vintage com cúpula de tecido e base de cerâmica. Proporciona uma luz difusa e aconchegante, ideal para salas de leitura e home offices.",
      preco: 11990,
      imagemUrl: "https://m.media-amazon.com/images/I/61GW5eGBbAL.jpg",
      categoria: "Luminárias",
      estoque: 8,
    },
    {
      nome: "Luminária de Emergência",
      descricao: "Nunca fique no escuro",
      descDetalhada:
        "Liga automaticamente em caso de queda de energia. Bateria recarregável com autonomia de até 4 horas. Compacta e fácil de instalar em qualquer cômodo.",
      preco: 6990,
      imagemUrl: "https://m.media-amazon.com/images/I/51BxCx3UJAL.jpg",
      categoria: "Luminárias",
      estoque: 30,
    },
    {
      nome: "Fita LED Decorativa 5m",
      descricao: "Personalize o ambiente de leitura",
      descDetalhada:
        "Fita LED de 5 metros com adesivo na parte traseira para fácil instalação. Disponível em luz quente ou colorida, controlada por controle remoto. Baixo consumo de energia.",
      preco: 4990,
      imagemUrl: "https://m.media-amazon.com/images/I/61bX6vvQCiL.jpg",
      categoria: "Luminárias",
      estoque: 27,
    },
    {
      nome: "Luminária Dobrável USB-C",
      descricao: "Para leitura em viagens",
      descDetalhada:
        "Design dobrável e ultrafino que cabe em qualquer mochila. Alimentada via USB-C com 3 níveis de brilho ajustáveis. Ideal para viagens, quartos de hotel e leituras ao ar livre.",
      preco: 5990,
      imagemUrl: "https://m.media-amazon.com/images/I/51GF-YkuqIL.jpg",
      categoria: "Luminárias",
      estoque: 19,
    },
    {
      nome: "Luminária de Projeção Estelar",
      descricao: "Crie um céu estrelado no quarto",
      descDetalhada:
        "Projeta estrelas e constelações no teto e nas paredes. Ideal para criar um ambiente relaxante e imersivo para leituras noturnas. Rotação automática com timer de desligamento.",
      preco: 14990,
      imagemUrl: "https://m.media-amazon.com/images/I/61V4h0Zq3EL.jpg",
      categoria: "Luminárias",
      estoque: 7,
    },
    {
      nome: "Luminária Infantil Cogumelo",
      descricao: "Iluminação fofa para o quartinho",
      descDetalhada:
        "Luminária decorativa no formato de cogumelo com luz LED em tons suaves. Perfeita para quartos infantis, proporciona uma iluminação aconchegante para leituras antes de dormir.",
      preco: 4290,
      imagemUrl: "https://m.media-amazon.com/images/I/51BxCx3UJAL.jpg",
      categoria: "Luminárias",
      estoque: 21,
    },
    {
      nome: "Luminária de Parede Articulada",
      descricao: "Leitura sem ocupar a mesa",
      descDetalhada:
        "Braço articulado com 3 pontos de ajuste permite posicionar a luz exatamente onde você precisa. Instalação simples na parede, ideal para cabeceiras e mesas de estudo.",
      preco: 9990,
      imagemUrl: "https://m.media-amazon.com/images/I/61W5+4eSi3L.jpg",
      categoria: "Luminárias",
      estoque: 11,
    },
    {
      nome: "Vela Aromática Lavanda",
      descricao: "Relaxe durante a leitura",
      descDetalhada:
        "Vela de cera de soja com essência de lavanda, queima limpa e duração de até 40 horas. Cria um ambiente relaxante e aconchegante para as suas sessões de leitura.",
      preco: 3490,
      imagemUrl: "https://m.media-amazon.com/images/I/61GW5eGBbAL.jpg",
      categoria: "Luminárias",
      estoque: 33,
    },
    {
      nome: "Luminária Minimalista Nórdica",
      descricao: "Design escandivano para sua mesa",
      descDetalhada:
        "Luminária de mesa com design nórdico em madeira natural e metal. Luz LED de 8W com temperatura ajustável entre quente e fria. Elegante e funcional.",
      preco: 15990,
      imagemUrl: "https://m.media-amazon.com/images/I/51wBJPM7GjL.jpg",
      categoria: "Luminárias",
      estoque: 5,
    },
  ];

  await prisma.produto.createMany({
    data: produtos,
  });

  console.log(`${produtos.length} produtos cadastrados com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

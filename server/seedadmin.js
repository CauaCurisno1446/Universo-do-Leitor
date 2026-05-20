// const { PrismaClient } = require("@prisma/client");
// const bcrypt = require("bcryptjs");

// const prisma = new PrismaClient();

// async function main() {
//   const senhaHash = await bcrypt.hash("admin123", 10);

//   const admin = await prisma.usuario.create({
//     data: {
//       nome: "Admin",
//       cpf: "000.000.000-00",
//       email: "admin@loja.com",
//       senha: senhaHash,
//       role: "admin",
//     },
//   });

//   console.log("Admin criado:", admin.email);
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());

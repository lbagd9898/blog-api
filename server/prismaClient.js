const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
console.log("prisma client loaded");
module.exports = prisma;

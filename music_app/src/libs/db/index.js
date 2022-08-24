const { PrismaClient } = require("@prisma/client")
const { prod } = require("../../config")

let prisma

if (prod) {
  prisma = new PrismaClient()
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient()
  }
  prisma = globalThis.prisma
}

module.exports = prisma
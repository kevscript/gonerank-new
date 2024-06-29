import { Prisma, PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// const prismaClientSingleton = () => {
//   return new PrismaClient<
//     Prisma.PrismaClientOptions,
//     "info" | "warn" | "error" | "query"
//   >({
//     log: ["query", "info", "warn", "error"],
//   });
// };

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// prisma.$on("query", (e) => {
//   console.log("Query Duration: " + e.duration + "ms");
// });

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

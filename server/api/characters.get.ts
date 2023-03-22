import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async () => {
    const prisma = new PrismaClient();
    const characters = await prisma.character.findMany();

    return characters;
});

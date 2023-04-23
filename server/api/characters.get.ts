import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;

    const prisma = new PrismaClient();

    const characters = await prisma.character.findMany({
        where: {
            user_id: userId,
        },
    });

    return characters;
});

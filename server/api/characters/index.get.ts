import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;

    const prisma = new PrismaClient();

    const characters = await prisma.characters.findMany({
        select: {
            id: true,
            user_id: true,
            name: true,
            avatar_src: true,
            prompt: true,
        },
        where: {
            user_id: userId,
        },
    });

    return characters;
});

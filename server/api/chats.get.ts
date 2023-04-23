import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;

    const prisma = new PrismaClient();

    const chats = await prisma.chats.findMany({
        select: {
            id: true,
            character_id: true,
            Character: {
                select: {
                    name: true,
                    avatar_src: true,
                },
            },
            Messages: {
                select: { content: true },
                where: {},
                orderBy: {
                    id: "desc",
                },
                take: 1,
            },
        },
        where: {
            user_id: userId,
        },
    });

    return chats;
});

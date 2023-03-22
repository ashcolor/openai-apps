import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async () => {
    const prisma = new PrismaClient();
    const chats = await prisma.chat.findMany({
        select: {
            id: true,
            characterId: true,
            Character: {
                select: {
                    name: true,
                    avatarSrc: true,
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
    });

    return chats;
});

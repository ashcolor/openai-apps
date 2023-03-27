import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const query = getQuery(event);

    const messages = await prisma.message.findMany({
        select: {
            role: true,
            content: true,
        },
        where: {
            chatId: parseInt(query.chatId),
        },
        orderBy: {
            id: "asc",
        },
    });

    return messages;
});

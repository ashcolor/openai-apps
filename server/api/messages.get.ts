import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;
    const query = getQuery(event);
    const chatId = parseInt(query.chatId);

    const prisma = new PrismaClient();

    const messages = await prisma.messages.findMany({
        select: {
            role: true,
            content: true,
        },
        where: {
            user_id: userId,
            chatId: chatId,
        },
        orderBy: {
            id: "asc",
        },
    });

    return messages;
});

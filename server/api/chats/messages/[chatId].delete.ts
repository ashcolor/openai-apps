import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const chatId = parseInt(event.context.params?.chatId || "");

    if (!chatId) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    try {
        const message = await prisma.message.deleteMany({
            where: {
                chatId: chatId,
            },
        });

        return message;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }
});

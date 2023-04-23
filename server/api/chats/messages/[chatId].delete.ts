import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const chatId = parseInt(event.context.params?.chatId || "");

    if (!chatId) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    const prisma = new PrismaClient();

    try {
        const message = await prisma.messages.deleteMany({
            where: {
                user_id: userId,
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

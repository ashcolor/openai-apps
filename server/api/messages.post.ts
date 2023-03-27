import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const body = await readBody(event);
    const chatId = body.chatId;

    if (!chatId) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    try {
        const message = await prisma.message.create({
            data: {
                Chat: {
                    connect: {
                        id: chatId,
                    },
                },
                role: body.role,
                content: body.content,
            },
        });
        return message;
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: "取得に失敗しました",
        });
    }
});

import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;
    const body = await readBody(event);
    const chatId = body.chatId;

    if (!chatId) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    const prisma = new PrismaClient();

    try {
        const message = await prisma.messages.create({
            data: {
                user_id: userId,
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
        // console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "取得に失敗しました",
        });
    }
});

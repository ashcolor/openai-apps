import { createRouter, defineEventHandler, useBase } from "h3";
import { PrismaClient } from "@prisma/client";

const router = createRouter();

// DELETE /api/chat/:chatId/messages
router.delete(
    "/:chatId/messages",
    defineEventHandler(async (event) => {
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
                    chat_id: chatId,
                },
            });

            return message;
        } catch (e) {
            console.error(e);
            throw createError({
                statusCode: 400,
                statusMessage: "削除に失敗しました",
            });
        }
    })
);

export default useBase("/api/chats", router.handler);

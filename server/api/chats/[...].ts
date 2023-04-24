import { createRouter, defineEventHandler, useBase } from "h3";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const router = createRouter();

// PATCH /api/chats/:id
router.patch(
    "/chats/:id",
    defineEventHandler(async (event) => {
        const id = event.context.params?.id;
        const body = await readBody(event);

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: "IDは必須です",
            });
        }

        const prisma = new PrismaClient();

        try {
            const chat = await prisma.chats.update({
                where: {
                    id: parseInt(id),
                },
                data: body,
            });
            return chat;
        } catch (e) {
            console.error(e);
            throw createError({
                statusCode: 400,
                statusMessage: "保存に失敗しました",
            });
        }
    })
);

// DELETE /api/chats/:id
router.delete(
    "/chats/:id",
    defineEventHandler(async (event) => {
        const id = event.context.params?.id;

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: "",
            });
        }

        const prisma = new PrismaClient();

        try {
            const chat = await prisma.chats.delete({
                where: {
                    id: parseInt(id),
                },
            });
            return chat;
        } catch (e) {
            console.log(e);
            throw createError({
                statusCode: 400,
                statusMessage: "取得に失敗しました",
            });
        }
    })
);

// // DELETE /api/chat/:chatId/messages
router.delete(
    "/chats/:chatId/messages",
    defineEventHandler(async (event) => {
        const chatId = parseInt(event.context.params?.chatId || "");

        log;
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

// GET /api/chats/:id
router.get(
    "/chats/:id",
    defineEventHandler(async (event) => {
        const id = event.context.params?.id;

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: "",
            });
        }

        const prisma = new PrismaClient();

        try {
            const chat = await prisma.chats.findUnique({
                select: {
                    character_id: true,
                    Character: {
                        select: {
                            name: true,
                            avatar_src: true,
                        },
                    },
                    Messages: true,
                },
                where: {
                    id: parseInt(id),
                },
            });
            return chat;
        } catch (e) {
            console.error(e);
            throw createError({
                statusCode: 400,
                statusMessage: "取得に失敗しました",
            });
        }
    })
);
export default useBase("/api", router.handler);

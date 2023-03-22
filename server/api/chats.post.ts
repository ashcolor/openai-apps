import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const body = await readBody(event);
    const characterId = body.characterId;

    if (!characterId) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    try {
        const chat = await prisma.chat.create({
            data: {
                Character: {
                    connect: {
                        id: characterId,
                    },
                },
            },
        });
        return chat;
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: "取得に失敗しました",
        });
    }
});

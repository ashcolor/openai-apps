import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
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
});

import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const id = event.context.params?.id;

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    try {
        const chat = await prisma.chat.delete({
            where: {
                id: parseInt(id),
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

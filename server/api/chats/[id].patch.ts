import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const id = event.context.params?.id;
    const body = await readBody(event);

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "IDは必須です",
        });
    }

    try {
        const chat = await prisma.chat.update({
            where: {
                id: parseInt(id),
            },
            data: body,
        });
        return chat;
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: "保存に失敗しました",
        });
    }
});

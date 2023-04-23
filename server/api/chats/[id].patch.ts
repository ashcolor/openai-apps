import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
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
        const chat = await prisma.chat.update({
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
});

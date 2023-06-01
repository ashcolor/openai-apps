import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params?.id ?? "");
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
                id,
            },
            data: {
                updated_at: new Date(),
                ...body,
            },
        });
        return chat;
    } catch (e) {
        // console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "保存に失敗しました",
        });
    }
});

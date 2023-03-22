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
        const character = await prisma.character.update({
            where: {
                id: parseInt(id),
            },
            data: body,
        });
        return character;
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: "保存に失敗しました",
        });
    }
});

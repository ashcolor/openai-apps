import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const id = event.context.params?.id;

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "IDは必須です",
        });
    }

    try {
        const character = await prisma.character.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return character;
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: "取得に失敗しました",
        });
    }
});

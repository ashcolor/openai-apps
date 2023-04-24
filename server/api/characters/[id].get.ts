import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params?.id);

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "IDは必須です",
        });
    }

    const prisma = new PrismaClient();

    try {
        const character = await prisma.characters.findUnique({
            where: {
                id: id,
            },
        });
        return character;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "取得に失敗しました",
        });
    }
});

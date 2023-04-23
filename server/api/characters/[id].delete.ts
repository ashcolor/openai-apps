import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "IDは必須です",
        });
    }

    const prisma = new PrismaClient();

    try {
        const character = await prisma.characters.delete({
            where: {
                id: parseInt(id),
            },
        });
        return character;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "削除に失敗しました",
        });
    }
});

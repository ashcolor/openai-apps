import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params?.id ?? "");

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    const prisma = new PrismaClient();

    try {
        const character = await prisma.characters.findUnique({
            select: {
                id: true,
                prompt: true,
                name: true,
                Templates: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                    },
                },
            },
            where: {
                id,
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

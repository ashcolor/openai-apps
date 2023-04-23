import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;
    const body = await readBody(event);

    const prisma = new PrismaClient();

    try {
        const character = await prisma.profiles.update({
            where: {
                id: userId,
            },
            data: body,
        });
        return character;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "保存に失敗しました",
        });
    }
});

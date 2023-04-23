import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;
    const body = await readBody(event);

    const prisma = new PrismaClient();

    try {
        const character = await prisma.character.create({
            data: {
                user_id: userId,
                ...body,
            },
        });
        return character;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "登録に失敗しました",
        });
    }
});

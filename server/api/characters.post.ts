import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const body = await readBody(event);

    try {
        const character = await prisma.character.create({
            data: body,
        });
        return character;
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: "登録に失敗しました",
        });
    }
});

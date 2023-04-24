import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params?.id || "");

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    const prisma = new PrismaClient();

    try {
        const message = await prisma.messages.deleteMany({
            where: {
                chat_id: id,
            },
        });

        return message;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "削除に失敗しました",
        });
    }
});

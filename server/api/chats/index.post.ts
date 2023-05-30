import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;
    const body = await readBody(event);
    const characterId = body.character_id;

    const data = characterId
        ? {
              Character: {
                  connect: {
                      id: characterId,
                  },
              },
          }
        : {};

    const prisma = new PrismaClient();

    try {
        const chat = await prisma.chats.create({
            data: {
                user_id: userId,
                ...data,
            },
        });
        return chat;
    } catch (e) {
        console.log(e);
        throw createError({
            statusCode: 400,
            statusMessage: "取得に失敗しました",
        });
    }
});

import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const body = await readBody(event);
    const characterId = body.characterId;

    const data = body.characterId
        ? {
              Character: {
                  connect: {
                      id: characterId,
                  },
              },
          }
        : {};

    try {
        const chat = await prisma.chat.create({
            data: data,
        });
        return chat;
    } catch (e) {
        throw createError({
            statusCode: 400,
            statusMessage: "取得に失敗しました",
        });
    }
});

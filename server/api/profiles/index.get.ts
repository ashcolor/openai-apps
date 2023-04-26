import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;

    const prisma = new PrismaClient();

    const profile = await prisma.profiles.findFirst({
        select: {
            id: true,
            openai_api_key: true,
            avatar_url: true,
            username: true,
            website: true,
        },
        where: {
            id: userId,
        },
    });

    return profile;
});

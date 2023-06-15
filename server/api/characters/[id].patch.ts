import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const userId = event.context.userId;
    const id = parseInt(event.context.params?.id ?? "");
    const body = await readBody(event);
    const templates = body?.templates;
    delete body.templates;

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "IDは必須です",
        });
    }

    const prisma = new PrismaClient();

    try {
        const result = await prisma.$transaction(async (prisma) => {
            await prisma.characters.update({
                where: {
                    id,
                },
                data: {
                    updated_at: new Date(),
                    ...body,
                },
            });

            await prisma.templates.deleteMany({
                where: {
                    user_id: userId,
                    character_id: id,
                },
            });

            const newTemplates = templates.map((template: Object) => {
                delete template.id;
                return {
                    user_id: userId,
                    character_id: id,
                    ...template,
                };
            });
            await prisma.templates.createMany({
                data: newTemplates,
            });

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
        });
        return result;
    } catch (e) {
        // console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "保存に失敗しました",
        });
    } finally {
        prisma.$disconnect();
    }
});

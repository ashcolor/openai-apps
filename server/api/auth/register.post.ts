import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const email = body.email;

    const prisma = new PrismaClient();

    try {
        const existingUser = await prisma.users.findFirst({
            where: {
                email,
            },
        });

        if (existingUser) {
            throw Error("入力されたメールアドレスは使用されています");
        }

        const saltRounds = 10;
        const plainPassword = body.password;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        const user = await prisma.users.create({
            data: {
                id: randomUUID(),
                email,
                password: hashedPassword,
            },
        });
        return user;
    } catch (e: any) {
        console.error(e.message);
        throw createError({
            statusCode: 400,
            statusMessage: e?.message || "",
        });
    }
});

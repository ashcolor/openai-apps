import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const prisma = new PrismaClient();

    // TODO エラー処理
    // emailが存在していたらエラー

    const saltRounds = 10;
    const plainPassword = body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    try {
        const user = await prisma.users.create({
            data: {
                id: randomUUID(),
                email: body.email,
                password: hashedPassword,
            },
        });
        return user;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "登録に失敗しました",
        });
    }
});

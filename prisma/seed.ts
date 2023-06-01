import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const userId = randomUUID();
    await prisma.users.upsert({
        where: { id: userId },
        update: {},
        create: {
            id: userId,
            email: "user@example.com",
            email_verified_at: null,
            password: null,
            remember_token: null,
        },
    });

    await prisma.profiles.upsert({
        where: { id: userId },
        update: {},
        create: {
            id: userId,
            username: "ユーザ",
            avatar_url: "https://placehold.jp/24x24.png",
            openai_api_key: process.env.SEED_OPENAI_API_KEY || "",
        },
    });

    await prisma.characters.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_id: userId,
            name: "テストキャラクター",
            prompt: "あなたはシステム開発のスペシャリストです。",
            avatar_src: "",
        },
    });

    await prisma.templates.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_id: userId,
            character_id: 1,
            title: "テスト",
            content: "以下のコードのテストコードを作成してください。\n言語は{言語}です・",
        },
    });
    // console.log(template);

    await prisma.chats.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_id: userId,
            character_id: 1,
        },
    });
    // console.log(chat);

    await prisma.messages.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_id: userId,
            chat_id: 1,
            role: "assistant",
            content: "何でも質問してください。",
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async () => {
        await prisma.$disconnect();
        process.exit(1);
    });

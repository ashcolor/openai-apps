import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    const profile = await prisma.profiles.upsert({
        where: { id: process.env.SEED_USER_ID || "" },
        update: {},
        create: {
            id: process.env.SEED_USER_ID || "",
            username: "ユーザ",
            avatar_url: "https://placehold.jp/24x24.png",
            website: "https:example.com",
            email: "user@example.com",
        },
    });
    console.log(profile);

    const character = await prisma.characters.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_id: process.env.SEED_USER_ID || "",
            name: "テストキャラクター",
            prompt: "あなたはシステム開発のスペシャリストです。",
            avatar_src: "",
        },
    });
    console.log(character);

    const chat = await prisma.chats.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_id: process.env.SEED_USER_ID || "",
            character_id: 1,
        },
    });
    console.log(chat);

    const message = await prisma.messages.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            user_id: process.env.SEED_USER_ID || "",
            chat_id: 1,
            role: "assistant",
            content: "何でも質問してください。",
        },
    });
    console.log(message);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

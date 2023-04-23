import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const chatId = parseInt(event.context.params?.chatId || "");
    const body = await readBody(event);
    const userContent = body.content;

    console.log(chatId);

    if (!chatId) {
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }

    try {
        const userMessage = {
            role: "user",
            content: userContent,
        };

        const userMessageObject = await prisma.messages.create({
            data: {
                Chat: {
                    connect: {
                        id: chatId,
                    },
                },
                ...userMessage,
            },
        });

        const chat = await prisma.chats.findUnique({
            select: {
                Character: true,
                characterId: true,
                Messages: true,
            },
            where: {
                id: chatId,
            },
        });

        const messages = [];

        if (chat.Character.prompt) {
            messages.push({
                role: "system",
                content: chat.Character.prompt,
            });
        }

        if (chat.messages) {
            chat.messages.forEach((message) => {
                messages.push({
                    role: message.role,
                    content: message.content,
                });
            });
        }

        messages.push(userMessage);

        const payload = {
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 1000,
        };

        console.log(payload);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        console.log(response.body);

        const json = await response.json();

        const assistantMessage = {
            role: "assistant",
            content: json.choices[0].message.content,
        };

        const message = await prisma.messages.create({
            data: {
                Chat: {
                    connect: {
                        id: chatId,
                    },
                },
                ...assistantMessage,
            },
        });

        return message;
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 400,
            statusMessage: "",
        });
    }
});

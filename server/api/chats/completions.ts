import OpenAI from "openai";
import { OpenAIStream } from "ai";

export default defineEventHandler(async (event) => {
    const apiKey = import.meta.env.OPENAI_API_KEY;

    const openai = new OpenAI({ apiKey });

    const { messages } = await readBody(event);

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages,
    });

    return OpenAIStream(response);
});

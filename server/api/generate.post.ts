export default defineEventHandler(async (event) => {
    const messages = await readBody(event);

    const payload = {
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 1000,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });

    const json = response.json();
    return json;
});

export default defineEventHandler(async (event) => {
    const messages = await readBody(event);

    console.log(messages);
    const payload = {
        model: "gpt-3.5-turbo",
        messages: messages,
        // temperature: 0.7,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
        // max_tokens: 300,
        // n: 1,
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

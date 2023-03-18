export default defineEventHandler(async (event) => {
    const messages = await readBody(event);

    const payload = {
        model: "gpt-3.5-turbo",
        messages: messages,
        // 温度
        // temperature: 1.2,
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

    console.log(response.body);
    const json = response.json();
    return json;
});

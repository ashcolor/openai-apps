import { Ref } from "nuxt/dist/app/compat/capi";

export const useChatCompletionsStream = (messages: Ref<any>) => {
    const data = ref<any>([]);
    const pending = ref<Boolean>(false);
    const message = ref<string>("");

    const execute = async () => {
        const payload = {
            model: "gpt-3.5-turbo",
            messages: messages.value,
            stream: true,
        };

        const config = useRuntimeConfig();
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.public.OPENAI_API_KEY ?? ""}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const reader = response.body?.getReader();

        if (response.status !== 200 || !reader) {
            return "error";
        }

        const decoder = new TextDecoder("utf-8");
        try {
            const read = async (): Promise<any> => {
                const { done, value } = await reader.read();
                if (done) return reader.releaseLock();

                const chunk = decoder.decode(value, { stream: true });
                const jsons = chunk
                    .split("data:")
                    .map((data) => {
                        const trimData = data.trim();
                        if (trimData === "") return undefined;
                        if (trimData === "[DONE]") return undefined;
                        return JSON.parse(data.trim());
                    })
                    .filter((data) => data);

                jsons.map((json) => {
                    message.value += json.choices[0].delta.content;
                });
                return read();
            };
            await read();
        } catch (e) {
            console.error(e);
        }
        reader.releaseLock();
    };

    return { message, data, pending, execute };
};

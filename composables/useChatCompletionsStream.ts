import { Ref } from "nuxt/dist/app/compat/capi";
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";

export const useChatCompletionsStream = (messages: Ref<any>) => {
    const systemStore = useSystemStore();
    const { openAiApiKey } = storeToRefs(systemStore);

    const data = ref<any>([]);
    const isStreaming = ref<boolean>(false);
    const message = ref<string>("");

    const execute = async () => {
        isStreaming.value = true;
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openAiApiKey.value}`,
            },
            method: "POST",
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages.value,
                stream: true,
            }),
        });

        if (response.status !== 200) {
            return "error";
        }

        const decoder = new TextDecoder("utf-8");
        const reader = response.body?.getReader();

        const read = async () => {
            const { done, value } = (await reader?.read()) || {};
            if (done) {
                reader?.releaseLock();
                isStreaming.value = true;
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            const jsons = chunk
                .split("data:")
                .map((data) => data.trim())
                .filter((data) => data !== "" && data !== "[DONE]")
                .map((data) => JSON.parse(data));

            jsons.forEach((json) => {
                if (json.choices?.[0]?.delta?.content) {
                    message.value += json.choices[0].delta.content;
                }
            });

            await read();
        };

        await read();
    };

    return { message, data, isStreaming, execute };
};

import { Ref } from "nuxt/dist/app/compat/capi";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~~/stores/useProfileStore";

export const useChatCompletionsStream = (messages: Ref<any>) => {
    const profileStore = useProfileStore();
    const { profile } = storeToRefs(profileStore);

    const data = ref<any>([]);
    const isStreaming = ref<boolean>(false);
    const message = ref<string>("");

    const execute = async () => {
        try {
            isStreaming.value = true;
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${profile.value?.openai_api_key}`,
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: messages.value,
                    stream: true,
                }),
            });

            if (response.status !== 200) {
                throw "エラーが発生しました";
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
        } catch (error) {
            throw error;
        } finally {
            isStreaming.value = false;
        }
    };

    return { message, data, isStreaming, execute };
};

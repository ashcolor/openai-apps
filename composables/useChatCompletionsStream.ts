import { Ref } from "nuxt/dist/app/compat/capi";

export const useChatCompletionsStream = (messages: Ref<any>) => {
    const data = ref<any>([]);
    const isStreaming = ref<boolean>(false);
    const message = ref<string>("");

    const execute = async () => {
        try {
            isStreaming.value = true;
            const response = await fetch("/api/chats/completions", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    messages: messages.value,
                }),
            });

            if (response.status !== 200) {
                throw new Error("エラーが発生しました");
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

                message.value += chunk;

                await read();
            };

            await read();
        } catch (error) {
            // console.error(error);
            return false;
        } finally {
            isStreaming.value = false;
        }
    };

    return { message, data, isStreaming, execute };
};

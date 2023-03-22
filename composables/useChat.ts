import { Ref } from "nuxt/dist/app/compat/capi";
import { ChatCompletionRequestMessage } from "openai";

export const useChat = async (chatId: Ref<number>) => {
    const messages = ref<Array<ChatCompletionRequestMessage>>([]);
    const pending = ref<boolean>(false);

    console.log(chatId.value);

    const { data: chat, refresh } = await useFetch(computed(() => `/api/chats/${chatId.value}`));

    watch(
        chat,
        () => {
            if (!chat.value) {
                messages.value = [];
            } else {
                messages.value = chat.value.Messages;
            }
        },
        {
            immediate: true,
        }
    );

    const addUserMessage = async (content: string) => {
        messages.value.push({
            role: "user",
            content: content,
        });

        const message = await $fetch(`/api/chats/user-message/${chatId.value}`, {
            method: "POST",
            body: { content },
            async onRequest({ request, options }) {
                pending.value = true;
            },
            async onRequestError({ request, options, error }) {
                pending.value = false;
            },
            async onResponse({ request, response, options }) {
                pending.value = false;
            },
            async onResponseError({ request, response, options }) {
                pending.value = false;
            },
        });
        messages.value.push(message);
    };

    const deleteAllMessages = async () => {
        const message = await $fetch(`/api/chats/messages/${chatId.value}`, {
            method: "DELETE",
        });
        messages.value = [];
    };

    return { chat, messages, pending, refresh, addUserMessage, deleteAllMessages };
};

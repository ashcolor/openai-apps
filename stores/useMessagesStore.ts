import { defineStore, storeToRefs } from "pinia";
import { useChatsStore } from "~~/stores/useChatsStore";
import { useChatStore } from "~~/stores/useChatStore";
import { useCharacterStore } from "./useCharacterStore";

export const useMessagesStore = defineStore("messages", () => {
    const chatsStore = useChatsStore();
    const chatStore = useChatStore();
    const characterStore = useCharacterStore();

    const { data: messages, refresh } = useFetch("/api/messages", {
        params: {
            chatId: computed(() => chatStore.selectedChatId),
        },
    });
    refresh();

    const {
        message: streamingMessage,
        isStreaming,
        execute,
    } = useChatCompletionsStream(
        computed(() => {
            const requestMessages = [];
            if (characterStore?.character?.prompt) {
                requestMessages.push({
                    role: "system",
                    content: characterStore?.character?.prompt,
                });
            }
            if (messages.value?.length !== 0) {
                messages.value?.map(({ role, content }) => requestMessages.push({ role, content }));
            }
            return requestMessages;
        })
    );

    const addMessage = async (role: string, content: string) => {
        const message = await $fetch(`/api/messages`, {
            method: "POST",
            body: {
                role,
                chatId: chatStore.selectedChatId,
                content,
            },
        });
        await chatsStore.refresh();
        await chatStore.refresh();
        await refresh();
    };

    const sendMessage = async (content: string) => {
        await addMessage("user", content);

        await execute();
        const tmpMessage = streamingMessage.value;
        streamingMessage.value = "";

        await addMessage("assistant", tmpMessage);
    };

    const deleteAllMessages = async () => {
        const message = await $fetch(`/api/chats/messages/${chatStore.selectedChatId}`, {
            method: "DELETE",
        });
        await chatsStore.refresh();
        await chatStore.refresh();
        await refresh();
    };

    return {
        messages,
        streamingMessage,
        isStreaming,
        sendMessage,
        deleteAllMessages,
    };
});

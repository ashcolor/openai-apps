import { defineStore, storeToRefs } from "pinia";
import { useChatsStore } from "~~/stores/useChatsStore";
import { useChatStore } from "~~/stores/useChatStore";

export const useMessagesStore = defineStore("messages", () => {
    const chatsStore = useChatsStore();
    const chatStore = useChatStore();
    const { chat } = storeToRefs(chatStore);

    const {
        data: messages,
        execute,
        refresh,
    } = useFetch("/api/messages", {
        params: {
            chatId: computed(() => chatStore.selectedChatId),
        },
        immediate: false,
    });

    if (chatStore.selectedChatId) {
        execute();
    }

    const {
        message: streamingMessage,
        isStreaming,
        execute: streamExecute,
    } = useChatCompletionsStream(
        computed(() => {
            const requestMessages = [];
            if (chat.value?.Character?.prompt) {
                requestMessages.push({
                    role: "system",
                    content: chat.value?.Character?.prompt,
                });
            }
            if (messages.value?.length !== 0) {
                messages.value?.map(({ role, content }) => requestMessages.push({ role, content }));
            }
            return requestMessages;
        })
    );

    const addMessage = async (role: string, content: string) => {
        await $fetch("/api/messages", {
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

        await streamExecute();

        if (streamingMessage.value === "") {
            return false;
        }

        await addMessage("assistant", streamingMessage.value);
        streamingMessage.value = "";
        return true;
    };

    const deleteAllMessages = async () => {
        await $fetch(`/api/chats/${chatStore.selectedChatId}/messages`, {
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

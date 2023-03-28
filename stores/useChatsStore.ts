import { defineStore } from "pinia";
import { useChatStore } from "./useChatStore";

export const useChatsStore = defineStore("chats", () => {
    const chatStore = useChatStore();

    const { data: chats, refresh } = useFetch("/api/chats");

    const addChat = async (characterId: number | null = null) => {
        const chat = await $fetch(`/api/chats`, {
            method: "POST",
            body: {
                characterId,
            },
        });
        chatStore.selectedChatId = chat.id;
        await refresh();
        await chatStore.refresh();
    };

    const deleteChat = async (chatId: number) => {
        const chat = await $fetch(`/api/chats/${chatId}`, {
            method: "DELETE",
        });
        await refresh();
        await chatStore.refresh();
    };

    return { chats, refresh, addChat, deleteChat };
});

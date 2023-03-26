import { defineStore } from "pinia";

export const useChatsStore = defineStore("chats", () => {
    const { data: chats, refresh } = useFetch("/api/chats");

    const addChat = async (characterId?: number) => {
        const chat = await $fetch(`/api/chats`, {
            method: "POST",
            body: {
                characterId: characterId || 1,
            },
        });
        await refresh();
    };

    const deleteChat = async (chatId: number) => {
        const chat = await $fetch(`/api/chats/${chatId}`, {
            method: "DELETE",
        });
        await refresh();
    };

    return { chats, refresh, addChat, deleteChat };
});

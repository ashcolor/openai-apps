import { defineStore, skipHydrate } from "pinia";
import { chats } from "@prisma/client";
import { useChatsStore } from "~~/stores/useChatsStore";

export const useChatStore = defineStore("chat", () => {
    const chatsStore = useChatsStore();

    const pending = ref<boolean>(false);

    const selectedChatId = ref<number | null>(null);
    const {
        data: chat,
        execute,
        refresh,
    } = useFetch<chats>(
        computed(() => `/api/chats/${selectedChatId.value}`),
        {
            immediate: false,
        }
    );

    if (selectedChatId.value) {
        execute();
    }

    const setCharacter = async (characterId: number) => {
        await $fetch(`/api/chats/${selectedChatId.value}`, {
            method: "PATCH",
            body: {
                character_id: characterId,
            },
        });
        refresh();
        chatsStore.refresh();
    };
    return {
        selectedChatId: skipHydrate(selectedChatId),
        chat,
        pending,
        refresh,
        setCharacter,
    };
});

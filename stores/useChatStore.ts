import { defineStore, skipHydrate, storeToRefs } from "pinia";
import { useChatsStore } from "~~/stores/useChatsStore";
import { useCharacterStore } from "./useCharacterStore";
import { Chat } from "@prisma/client";

export const useChatStore = defineStore("chat", () => {
    const chatsStore = useChatsStore();
    const characterStore = useCharacterStore();
    const { selectedCharacterId } = storeToRefs(characterStore);

    const pending = ref<boolean>(false);

    const selectedChatId = ref<number | null>(null);
    const {
        data: chat,
        execute,
        refresh,
    } = useFetch<Chat>(
        computed(() => `/api/chats/${selectedChatId.value}`),
        {
            immediate: false,
        }
    );

    watch(chat, () => {
        selectedCharacterId.value = chat.value?.characterId || null;
    });

    if (selectedChatId.value) {
        execute();
    }

    const setCharacter = async (characterId: number) => {
        const character = await $fetch(`/api/chats/${selectedChatId.value}`, {
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

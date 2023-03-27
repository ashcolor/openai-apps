import { defineStore, storeToRefs } from "pinia";
import { useChatsStore } from "~~/stores/useChatsStore";
import { useCharacterStore } from "./useCharacterStore";
import { Chat } from "@prisma/client";

export const useChatStore = defineStore("chat", () => {
    const chatsStore = useChatsStore();
    const characterStore = useCharacterStore();
    const { selectedCharacterId } = storeToRefs(characterStore);

    const pending = ref<boolean>(false);

    const selectedChatId = ref<number>(1);
    const { data: chat, refresh } = useFetch<Chat>(
        computed(() => `/api/chats/${selectedChatId.value}`)
    );
    refresh();

    watch(
        chat,
        () => {
            if (!chat.value) {
            } else {
                selectedCharacterId.value = chat.value.characterId;
            }
        },
        {
            immediate: true,
        }
    );

    const setCharacter = async (characterId: number) => {
        const character = await $fetch(`/api/chats/${selectedChatId.value}`, {
            method: "PATCH",
            body: {
                characterId: characterId,
            },
        });
        refresh();
        chatsStore.refresh();
    };
    return {
        selectedChatId,
        chat,
        pending,
        refresh,
        setCharacter,
    };
});

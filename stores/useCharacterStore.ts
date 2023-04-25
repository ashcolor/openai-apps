import { defineStore, storeToRefs } from "pinia";
import { useChatsStore } from "~~/stores/useChatsStore";
import { useChatStore } from "~~/stores/useChatStore";
import { useCharactersStore } from "~~/stores/useCharactersStore";
import { characters } from "@prisma/client";

export const useCharacterStore = defineStore("character", () => {
    const chatsStore = useChatsStore();
    const chatStore = useChatStore();
    const charactersStore = useCharactersStore();

    const selectedCharacterId = ref<number | null>(null);
    const {
        data: character,
        pending,
        refresh,
    } = useFetch<characters>(computed(() => `/api/characters/${selectedCharacterId.value}`));

    const patchCharacter = async (character: Object) => {
        const savedCharacter = await $fetch(`/api/characters/${selectedCharacterId.value}`, {
            method: "PATCH",
            body: character,
        });
    };

    return {
        selectedCharacterId,
        character,
        pending,
        refresh,
        patchCharacter,
    };
});

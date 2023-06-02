import { defineStore } from "pinia";
import { characters } from "@prisma/client";

export const useCharacterStore = defineStore("character", () => {
    const selectedCharacterId = ref<number | null>(null);
    const {
        data: character,
        pending,
        refresh,
    } = useFetch<characters>(computed(() => `/api/characters/${selectedCharacterId.value}`));

    const patchCharacter = async (character: Object) => {
        await $fetch(`/api/characters/${selectedCharacterId.value}`, {
            method: "PATCH",
            body: character,
        });
        await refresh();
    };

    return {
        selectedCharacterId,
        character,
        pending,
        refresh,
        patchCharacter,
    };
});

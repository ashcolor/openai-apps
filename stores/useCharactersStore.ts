import { defineStore } from "pinia";
import { useCharacterStore } from "~~/stores/useCharacterStore";

export const useCharactersStore = defineStore("characters", () => {
    const characterStore = useCharacterStore();

    const { data: characters, pending, error, refresh } = useFetch("/api/characters");

    const addCharacter = async () => {
        const character = await $fetch("/api/characters", {
            method: "POST",
            body: {
                name: DEFAULT_CHARACTER_NAME,
                avatar_src: DEFAULT_CHARACTER_AVATAR,
                prompt: "",
            },
        });
        characterStore.selectedCharacterId = character.id;
        await refresh();
        await characterStore.refresh();
    };

    const deleteCharacter = async (characterId: number) => {
        const character = await $fetch(`/api/characters/${characterId}`, {
            method: "DELETE",
        });
        characterStore.selectedCharacterId = null;
        await refresh();
        await characterStore.refresh();
    };

    return {
        characters,
        pending,
        refresh,
        addCharacter,
        deleteCharacter,
    };
});

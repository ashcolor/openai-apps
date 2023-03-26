import { defineStore } from "pinia";

export const useCharactersStore = defineStore("characters", () => {
    const { data: characters, pending, error, refresh } = useFetch("/api/characters");

    const addCharacter = async () => {
        const character = await $fetch("/api/characters", {
            method: "POST",
            body: {
                name: DEFAULT_CHARACTER_NAME,
                avatarSrc: DEFAULT_CHARACTER_AVATAR,
                prompt: "",
            },
        });
        await refresh();
    };

    const deleteCharacter = async (characterId: number) => {
        const character = await $fetch(`/api/characters/${characterId}`, {
            method: "DELETE",
        });
        await refresh();
    };

    return {
        characters,
        pending,
        refresh,
        addCharacter,
        deleteCharacter,
    };
});

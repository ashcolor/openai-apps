<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";
import { useCharactersStore } from "~~/stores/useCharactersStore";
import { useCharacterStore } from "~~/stores/useCharacterStore";

const chatStore = useChatStore();
const { setCharacter } = chatStore;
const charactersStore = useCharactersStore();
const { characters } = storeToRefs(charactersStore);
const characterStore = useCharacterStore();
const { selectedCharacterId } = storeToRefs(characterStore);

watch(selectedCharacterId, () => {
    if (!selectedCharacterId.value) return;
    setCharacter(selectedCharacterId.value);
});
</script>

<template>
    <label v-for="option in characters" class="label p-0">
        <div class="indicator cursor-pointer flex flex-row gap-2 place-items-center px-2">
            <input
                v-model="selectedCharacterId"
                type="radio"
                name="charactrerId"
                class="radio"
                :value="option.id"
            />
            <div class="avatar">
                <div class="w-6 rounded-full">
                    <img :src="option.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <span class="label-text">{{ option.name || "名称未設定" }}</span>
        </div>
    </label>
</template>

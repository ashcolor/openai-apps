<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";
import { useCharactersStore } from "~~/stores/useCharactersStore";

const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);
const { setCharacter } = chatStore;
const characterStore = useCharactersStore();
const { characters } = storeToRefs(characterStore);
const { addCharacter, deleteCharacter } = characterStore;

const handleInput = computed({
    get() {
        if (!chat.value) return -1;
        return chat.value.characterId;
    },
    async set(val: number) {
        return setCharacter(val);
    },
});
</script>

<template>
    <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
        <label v-for="option in characters" class="label p-0">
            <div class="indicator cursor-pointer flex flex-row gap-2 place-items-center px-2">
                <input
                    v-model="handleInput"
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
        <button class="btn btn-xs btn-circle btn-outline" type="button" @click="addCharacter()">
            <Icon name="ic:twotone-plus" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";
import { useCharactersStore } from "~~/stores/useCharactersStore";

const chatStore = useChatStore();
const { setCharacter } = chatStore;
const charactersStore = useCharactersStore();
const { characters } = storeToRefs(charactersStore);
</script>

<template>
    <div class="flex flex-col place-content-center place-items-center gap-8">
        <div
            v-for="character in characters"
            :key="character.id"
            class="card w-96 bg-base-100 shadow-xl"
        >
            <div class="card-body">
                <div class="flex flex-row gap-2">
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <img :src="character.avatar_src || DEFAULT_CHARACTER_AVATAR" />
                        </div>
                    </div>
                    <h2 class="card-title">{{ character.name }}</h2>
                </div>
                <p>{{ character.prompt }}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="setCharacter(character.id)">
                        会話をはじめる
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

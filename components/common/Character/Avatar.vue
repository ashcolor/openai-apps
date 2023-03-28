<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "~~/stores/useCharacterStore";

const characterStore = useCharacterStore();
const { character } = storeToRefs(characterStore);
</script>

<template>
    <div class="avatar cursor-pointer">
        <div class="w-12 rounded-full">
            <img :src="character?.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
        </div>
    </div>
</template>

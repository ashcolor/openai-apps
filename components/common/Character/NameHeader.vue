<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "~~/stores/useCharacterStore";

const characterStore = useCharacterStore();
const { character } = storeToRefs(characterStore);
</script>

<template>
    <div class="grow align-middle grid items-center">
        <p class="text-xl">
            {{ character?.name || DEFAULT_CHARACTER_NAME }}
        </p>
    </div>
</template>

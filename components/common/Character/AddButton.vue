<script setup lang="ts">
import { useCharactersStore } from "~~/stores/useCharactersStore";

const charactersStore = useCharactersStore();
const { addCharacter } = charactersStore;
</script>

<template>
    <button class="btn btn-xs btn-circle btn-outline" type="button" @click="addCharacter()">
        <Icon name="ic:twotone-plus" />
    </button>
</template>

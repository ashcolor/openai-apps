<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharactersStore } from "~~/stores/useCharactersStore";
import { useCharacterStore } from "~~/stores/useCharacterStore";

const charactersStore = useCharactersStore();
const { deleteCharacter } = charactersStore;
const characterStore = useCharacterStore();
const { selectedCharacterId } = storeToRefs(characterStore);

const onClick = () => {
    if (!selectedCharacterId.value) return;
    deleteCharacter(selectedCharacterId.value);
};
</script>

<template>
    <button type="button" class="btn btn-error btn-outlinew-full" @click="onClick()">削除</button>
</template>

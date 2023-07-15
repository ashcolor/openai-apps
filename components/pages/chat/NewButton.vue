<script setup lang="ts">
import { useChatsStore } from "~~/stores/useChatsStore";

const chatsStore = useChatsStore();
const { addChat } = chatsStore;
</script>
<template>
    <button class="btn btn-lg btn-primary" @click="addChat()">新しいチャットをはじめる</button>
</template>

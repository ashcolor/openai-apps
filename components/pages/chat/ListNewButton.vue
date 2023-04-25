<script setup lang="ts">
import { useChatsStore } from "~~/stores/useChatsStore";

const chatsStore = useChatsStore();
const { addChat } = chatsStore;
</script>
<template>
    <button class="btn btn-sm btn-block btn-outline" @click="addChat()">新しいチャット</button>
</template>

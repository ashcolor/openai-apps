<script setup lang="ts">
import { useMessagesStore } from "~~/stores/useMessagesStore";

const messagesStore = useMessagesStore();
const { deleteAllMessages } = messagesStore;
</script>

<template>
    <button class="btn btn-square" @click="deleteAllMessages()">
        <Icon name="ic:round-auto-delete" width="24" height="24" />
    </button>
</template>

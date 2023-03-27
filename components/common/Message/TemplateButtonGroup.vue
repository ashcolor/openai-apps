<script setup lang="ts">
import { useMessagesStore } from "~~/stores/useMessagesStore";

const messagesStore = useMessagesStore();
const { sendMessage } = messagesStore;
</script>

<template>
    <div class="shrink-0 flex flex-row gap-2 overflow-x-auto">
        <span
            v-for="message in TEMPLATE_USER_MESSAGES"
            class="btn btn-xs"
            @click="sendMessage(message)"
        >
            {{ message }}
        </span>
    </div>
</template>

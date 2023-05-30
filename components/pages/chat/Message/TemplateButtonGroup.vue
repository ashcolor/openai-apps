<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";
import { useSystemStore } from "~~/stores/useSystemStore";

const chatStore = useChatStore();
const { chat } = chatStore;

const systemStore = useSystemStore();
const { userMessageInput } = storeToRefs(systemStore);
</script>

<template>
    <div class="shrink-0 flex flex-row gap-2 overflow-x-auto">
        <span
            v-for="message in chat.Character.Templates"
            class="btn btn-xs"
            @click="userMessageInput = message.content"
        >
            {{ message.title }}
        </span>
    </div>
</template>

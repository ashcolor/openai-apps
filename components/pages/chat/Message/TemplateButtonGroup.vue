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
        <button
            v-for="template in chat.Character.Templates"
            :key="template.id"
            class="btn btn-xs btn-outline"
            @click="userMessageInput = template.content"
        >
            {{ template.title }}
        </button>
    </div>
</template>

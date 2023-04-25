<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";

const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);
</script>

<template>
    <div class="grow align-middle grid items-center">
        <p class="text-xl">
            {{ chat?.Character.name || DEFAULT_CHARACTER_NAME }}
        </p>
    </div>
</template>

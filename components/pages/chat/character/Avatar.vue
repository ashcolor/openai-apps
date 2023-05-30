<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";

const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);
</script>

<template>
    <div class="avatar cursor-pointer">
        <div class="w-12 rounded-full">
            <img :src="chat?.Character.avatar_src || DEFAULT_CHARACTER_AVATAR" />
        </div>
    </div>
</template>

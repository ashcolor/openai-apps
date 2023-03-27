<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";
import { useMessagesStore } from "~~/stores/useMessagesStore";
import { useSystemStore } from "~~/stores/useSystemStore";

const systemStore = useSystemStore();
const { isCharacterEditing } = storeToRefs(systemStore);
const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);
const messagesStore = useMessagesStore();
const { deleteAllMessages } = messagesStore;
</script>

<template>
    <div class="shrink-0 p-2 flex flex-row justify-center gap-4">
        <div class="avatar cursor-pointer">
            <div class="w-12 rounded-full">
                <img :src="chat?.Character.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
            </div>
        </div>
        <div class="grow align-middle grid items-center">
            <p class="text-xl">
                {{ chat?.Character.name || DEFAULT_CHARACTER_NAME }}
            </p>
        </div>
        <button
            v-show="isCharacterEditing"
            class="btn btn-square"
            @click="isCharacterEditing = false"
        >
            <Icon name="ic:baseline-chat" width="24" height="24" />
        </button>
        <button
            v-show="!isCharacterEditing"
            class="btn btn-square"
            @click="isCharacterEditing = true"
        >
            <Icon name="ic:baseline-person" width="24" height="24" />
        </button>
        <button class="btn btn-square" @click="deleteAllMessages()">
            <Icon name="ic:round-auto-delete" width="24" height="24" />
        </button>
    </div>
</template>

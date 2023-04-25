<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatsStore } from "~~/stores/useChatsStore";
import { useChatStore } from "~~/stores/useChatStore";

const chatsStore = useChatsStore();
const { chats } = storeToRefs(chatsStore);
const { deleteChat } = chatsStore;
const chatStore = useChatStore();
const { selectedChatId } = storeToRefs(chatStore);
</script>

<template>
    <ul class="menu bg-base-100 h-full overflow-y-auto flex flex-col flex-nowrap">
        <li v-for="chat in chats" @click="selectedChatId = chat.id">
            <div
                class="w-full flex flex-row flex-nowrap"
                :class="{ 'bg-base-300': selectedChatId === chat.id }"
            >
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img :src="chat?.Character?.avatar_src || DEFAULT_CHARACTER_AVATAR" />
                    </div>
                </div>
                <div class="grow shrink min-w-0">
                    <div>{{ chat?.Character?.name }}</div>
                    <div class="text-sm font-light truncate">
                        {{ chat?.Messages[0]?.content }}
                    </div>
                </div>
                <div>
                    <button class="btn btn-xs btn-ghost" @click="deleteChat(chat.id)">
                        <Icon name="ic:outline-close" width="16" height="16"></Icon>
                    </button>
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>

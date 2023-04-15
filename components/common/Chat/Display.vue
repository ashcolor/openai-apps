<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";
import { useMessagesStore } from "~~/stores/useMessagesStore";
import { useCharacterStore } from "~~/stores/useCharacterStore";

const systemStore = useSystemStore();
const { userAvatarSrc } = storeToRefs(systemStore);

const messagesStore = useMessagesStore();
const { messages, streamingMessage, isStreaming } = storeToRefs(messagesStore);
const { sendMessage } = messagesStore;

const characterStore = useCharacterStore();
const { character } = storeToRefs(characterStore);

const isEmpty = computed(() => {
    return messages?.value?.length === 0;
});

const chatElement = ref<HTMLElement>();
const { arrivedState, scrollBottom } = useScroll(chatElement, { behavior: "smooth" });

useMutationObserver(
    chatElement,
    () => {
        if (!arrivedState.bottom) return;
        scrollBottom();
    },
    {
        childList: true,
        subtree: true,
    }
);

const chatClass = (role: string) => {
    return role === "assistant" ? "chat-start" : "chat-end";
};
</script>

<template>
    <div v-show="!isEmpty" ref="chatElement" class="w-full h-full overflow-y-auto">
        <div v-for="message in messages" class="chat" :class="chatClass(message.role)">
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img
                        v-if="message.role === 'assistant'"
                        :src="character?.avatarSrc || DEFAULT_CHARACTER_AVATAR"
                    />
                    <img v-else :src="userAvatarSrc || DEFAULT_USER_AVATAR" />
                </div>
            </div>
            <div v-html="nl2br(message.content)" class="chat-bubble"></div>
        </div>
        <div v-if="isStreaming || streamingMessage" class="chat" :class="chatClass('assistant')">
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img :src="character?.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div v-if="streamingMessage" v-html="nl2br(streamingMessage)" class="chat-bubble"></div>
            <div v-else class="chat-bubble">
                <TreeDotsAnimationImg></TreeDotsAnimationImg>
            </div>
        </div>
    </div>
    <div v-show="isEmpty" class="w-full h-full grid place-items-center">
        <button class="btn btn-wide" @click="sendMessage('')">会話をはじめる</button>
    </div>
</template>

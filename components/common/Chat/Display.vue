<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";
import { useChatStore } from "~~/stores/useChatStore";
import { useMessagesStore } from "~~/stores/useMessagesStore";

const systemStore = useSystemStore();
const { userAvatarSrc } = storeToRefs(systemStore);

const chatStore = useChatStore();
const { chat, pending } = storeToRefs(chatStore);

const messagesStore = useMessagesStore();
const { messages, streamingMessage } = storeToRefs(messagesStore);
const { sendMessage } = messagesStore;

const isEmpty = computed(() => {
    return messages?.value?.length === 0;
});

const el = ref<HTMLElement>();
const { y } = useScroll(el);

useMutationObserver(
    el,
    (mutations) => {
        const scrollHeight = el.value?.scrollHeight ?? 0;
        y.value = scrollHeight;
    },
    {
        childList: true,
    }
);

const chatClass = (role: string) => {
    return role === "assistant" ? "chat-start" : "chat-end";
};
</script>

<template>
    <div v-show="!isEmpty" ref="el" class="w-full h-full overflow-y-auto">
        <div v-for="message in messages" class="chat" :class="chatClass(message.role)">
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img
                        v-if="message.role === 'assistant'"
                        :src="chat?.Character.avatarSrc || DEFAULT_CHARACTER_AVATAR"
                    />
                    <img v-else :src="userAvatarSrc || DEFAULT_USER_AVATAR" />
                </div>
            </div>
            <div v-html="nl2br(message.content)" class="chat-bubble"></div>
        </div>

        <div v-if="pending" class="chat" :class="chatClass('assistant')">
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img :src="chat?.characterId.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div class="chat-bubble">
                <TreeDotsAnimationImg></TreeDotsAnimationImg>
            </div>
        </div>

        <div v-if="streamingMessage" class="chat" :class="chatClass('assistant')">
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img :src="chat?.characterId.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div v-html="nl2br(streamingMessage)" class="chat-bubble"></div>
        </div>
    </div>
    <div v-show="isEmpty" class="w-full h-full grid place-items-center">
        <button class="btn btn-wide" @click="sendMessage('')">会話をはじめる</button>
    </div>
</template>

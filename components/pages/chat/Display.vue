<script setup lang="ts">
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~~/stores/useProfileStore";
import { useMessagesStore } from "~~/stores/useMessagesStore";
import { useChatStore } from "~~/stores/useChatStore";
import { nl2br } from "~/utils/utils";

const toast = useToast();

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const messagesStore = useMessagesStore();
const { messages, streamingMessage, isStreaming } = storeToRefs(messagesStore);
const { sendMessage } = messagesStore;

const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);

const isEmpty = computed(() => {
    return messages?.value?.length === 0;
});

const chatElement = ref<HTMLElement>();
const { arrivedState, scrollBottom } = useScroll(
    chatElement
    // TODO smoothの場合、スクロールが追従しなくなることがあった
    // { behavior: "smooth" }
);

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

const onClickStartChatButton = async () => {
    const response = await sendMessage("");
    if (!response) {
        toast.error("メッセージの取得に失敗しました");
    }
};
</script>

<template>
    <div v-show="!isEmpty" ref="chatElement" class="w-full h-full overflow-y-auto">
        <div
            v-for="message in messages"
            :key="message.id"
            class="chat"
            :class="chatClass(message.role)"
        >
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img
                        v-if="message.role === 'assistant'"
                        :src="chat?.Character?.avatar_src || DEFAULT_CHARACTER_AVATAR"
                    />
                    <img v-else :src="profile?.avatar_url || DEFAULT_USER_AVATAR" />
                </div>
            </div>
            <div class="chat-bubble" v-html="nl2br(message.content)"></div>
        </div>
        <div v-if="isStreaming || streamingMessage" class="chat" :class="chatClass('assistant')">
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img :src="chat?.Character?.avatar_src || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div v-if="streamingMessage" class="chat-bubble" v-html="nl2br(streamingMessage)"></div>
            <div v-else class="chat-bubble">
                <TreeDotsAnimationImg></TreeDotsAnimationImg>
            </div>
        </div>
    </div>
    <div v-show="isEmpty" class="w-full h-full grid place-items-center">
        <button class="btn btn-wide" @click="onClickStartChatButton()">会話をはじめる</button>
    </div>
</template>

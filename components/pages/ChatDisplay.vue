<script setup lang="ts">
import { ChatCompletionRequestMessage } from "openai";

interface Props {
    messages: Array<ChatCompletionRequestMessage>;
    assistantAvatarSrc: string;
    isAssistantThinking: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const isEmpty = computed(() => {
    return props.messages.length === 0 && !props.isAssistantThinking;
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
                        :src="assistantAvatarSrc || DEFAULT_CHARACTER_AVATAR"
                    />
                    <img v-else :src="DEFAULT_USER_AVATAR" />
                </div>
            </div>
            <div v-html="nl2br(message.content)" class="chat-bubble"></div>
        </div>
        <div v-if="isAssistantThinking" class="chat" :class="chatClass('assistant')">
            <div class="chat-image avatar">
                <div class="w-12 rounded-full">
                    <img :src="assistantAvatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div class="chat-bubble">
                <TreeDotsAnimationImg></TreeDotsAnimationImg>
            </div>
        </div>
    </div>
    <div v-show="isEmpty" class="w-full h-full grid place-items-center">
        <slot name="empty"></slot>
    </div>
</template>

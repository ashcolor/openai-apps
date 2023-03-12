<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { ChatCompletionRequestMessage } from "openai";

interface Props {
    messages: Array<ChatCompletionRequestMessage>;
}
const props = withDefaults(defineProps<Props>(), {});

const el = ref<HTMLElement>();
const { y } = useScroll(el);
useResizeObserver(el, (entries) => {
    const entry = entries[0];
    const scrollHeight = entry.target.scrollHeight;
    y.value = scrollHeight;
});

const chatClass = (role: string) => {
    return role === "assistant" ? "chat-start" : "chat-end";
};

const chatImageIconName = (role: string) => {
    return role === "assistant" ? "mdi:brain" : "mdi:user";
};
</script>

<template>
    <div ref="el" class="w-full h-full overflow-y-auto">
        <div v-for="message in messages" class="chat" :class="chatClass(message.role)">
            <div class="chat-image avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                    <Icon :name="chatImageIconName(message.role)" class="w-6 h-6 m-auto" />
                </div>
            </div>
            <div v-html="nl2br(message.content)" class="chat-bubble"></div>
        </div>
    </div>
</template>

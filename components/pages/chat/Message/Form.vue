<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";
import { useMessagesStore } from "~~/stores/useMessagesStore";

const systemStore = useSystemStore();
const { userMessageInput } = storeToRefs(systemStore);

const messagesStore = useMessagesStore();
const { sendMessage } = messagesStore;

const onClickSend = () => {
    sendMessage(userMessageInput.value);
    userMessageInput.value = "";
};
</script>

<template>
    <div class="flex flex-col">
        <div class="relative">
            <ChatMessageApiKeyCheckOverlay></ChatMessageApiKeyCheckOverlay>
            <ChatMessageTextarea
                v-model="userMessageInput"
                class="textarea w-full"
                placeholder="Enterで送信"
                @on-key-down-enter="onClickSend"
            ></ChatMessageTextarea>
        </div>
        <div class="w-full">
            <button class="btn btn-sm w-full" @click="onClickSend">送信</button>
        </div>
    </div>
</template>

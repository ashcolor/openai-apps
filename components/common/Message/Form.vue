<script setup lang="ts">
import { useMessagesStore } from "~~/stores/useMessagesStore";

const userMessage = ref<string>("");

const messagesStore = useMessagesStore();
const { sendMessage } = messagesStore;

const onClickSend = () => {
    sendMessage(userMessage.value);
    userMessage.value = "";
};
</script>

<template>
    <div class="flex flex-col">
        <MessageTextarea
            class="textarea w-full"
            placeholder="Enterで送信"
            v-model="userMessage"
            @onKeyDownEnter="onClickSend"
        ></MessageTextarea>
        <div class="w-full">
            <button class="btn btn-sm w-full" @click="onClickSend">送信</button>
        </div>
    </div>
</template>

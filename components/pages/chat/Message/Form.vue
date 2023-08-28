<script setup lang="ts">
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";
import { useMessagesStore } from "~~/stores/useMessagesStore";

const toast = useToast();

const systemStore = useSystemStore();
const { userMessageInput } = storeToRefs(systemStore);

const messagesStore = useMessagesStore();
const { sendMessage } = messagesStore;

const onClickSend = async () => {
    const tmpMessage = userMessageInput.value;
    userMessageInput.value = "";

    const response = await sendMessage(tmpMessage);
    if (!response) {
        toast.error("メッセージの取得に失敗しました");
        userMessageInput.value = tmpMessage;
    }
};
</script>

<template>
    <div class="flex flex-col">
        <ChatMessageTextarea
            v-model="userMessageInput"
            class="textarea w-full"
            placeholder="Enterで送信"
            @on-key-down-enter="onClickSend"
        ></ChatMessageTextarea>
        <div class="w-full">
            <button class="btn btn-sm w-full btn-primary" @click="onClickSend">送信</button>
        </div>
    </div>
</template>

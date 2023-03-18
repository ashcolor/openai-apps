<script setup lang="ts">
import { ChatCompletionRequestMessage } from "openai";

const systemMessage = ref<string>("");
const userMessage = ref<string>("");
const messageLogs = ref<Array<ChatCompletionRequestMessage>>([]);

const displayMessages = computed(() => {
    const tmpMessages: Array<ChatCompletionRequestMessage> = [];
    tmpMessages.push({
        role: "assistant",
        content: "何でも聞いてください。",
    });
    tmpMessages.push(...messageLogs.value);
    if (pending.value) {
        tmpMessages.push({
            role: "assistant",
            content: "...",
        });
    }
    return tmpMessages;
});

const requestMessages = computed(() => {
    const tmpMessages: Array<ChatCompletionRequestMessage> = [];
    if (systemMessage.value) {
        tmpMessages.push({
            role: "system",
            content: systemMessage.value,
        });
    }
    tmpMessages.push(...messageLogs.value);
    return tmpMessages;
});

const { data, pending, execute } = useChatCompletions(requestMessages);

const send = async (message: string) => {
    messageLogs.value.push({
        role: "user",
        content: message,
    });
    await execute();
    messageLogs.value.push(data.value.choices[0].message);
};

const onClickSampleUserMessageButton = (message: string) => {
    send(message);
};
const onClickSend = () => {
    send(userMessage.value);
    userMessage.value = "";
};
</script>

<template>
    <div class="h-full p-4 bg-base-200 flex flex-col gap-2">
        <div class="grow min-h-0">
            <ChatDisplay :messages="displayMessages"></ChatDisplay>
        </div>
        <div class="divider m-0"></div>
        <!-- <div class="collapse collapse-open shrink-0">
            <input type="checkbox" class="min-h-0" checked />
            <div class="collapse-title min-h-fit p-0">
                <Icon name="ic:baseline-arrow-drop-down"></Icon>
                詳細設定
            </div> -->
        <!-- <div class="collapse-content p-0"> -->
        <SystemMessageSelect v-model="systemMessage"></SystemMessageSelect>
        <!-- <SystemMessageSelectGroup v-model="systemMessage"></SystemMessageSelectGroup> -->
        <!-- </div> -->
        <!-- </div> -->
        <div class="shrink-0 flex flex-row gap-2 overflow-x-auto">
            <span
                v-for="message in SAMPLE_USER_MESSAGES"
                class="btn btn-xs"
                @click="onClickSampleUserMessageButton(message)"
            >
                {{ message }}
            </span>
        </div>
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
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>

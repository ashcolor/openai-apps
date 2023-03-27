<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMessagesStore } from "~~/stores/useMessagesStore";
import { useSystemStore } from "~~/stores/useSystemStore";

const systemStore = useSystemStore();
const { isCharacterEditing } = storeToRefs(systemStore);

const userMessage = ref<string>("");

const messagesStore = useMessagesStore();
const { sendMessage } = messagesStore;

const onClickSend = () => {
    sendMessage(userMessage.value);
    userMessage.value = "";
};
</script>

<template>
    <div class="grow bg-base-200 flex flex-col">
        <ChatMessageAreaHeader></ChatMessageAreaHeader>
        <div class="divider m-0"></div>
        <div v-show="!isCharacterEditing" class="grow min-h-0 flex flex-col">
            <div class="grow min-h-0 p-4">
                <ChatDisplay></ChatDisplay>
            </div>
            <div class="divider h-0 m-0"></div>
            <div class="p-4">
                <div class="flex flex-col gap-2">
                    <div class="shrink-0 flex flex-row gap-2 overflow-x-auto">
                        <span
                            v-for="message in SIMULATION_GAME_SAMPLE_USER_MESSAGES"
                            class="btn btn-xs"
                            @click="sendMessage(message)"
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
            </div>
        </div>
        <div v-show="isCharacterEditing" class="grow p-4">
            <div class="h-full flex flex-col">
                <CharacterSelect></CharacterSelect>
                <div class="divider m-0"></div>
                <CharacterEdit class="grow"></CharacterEdit>
            </div>
        </div>
    </div>
</template>

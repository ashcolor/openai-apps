<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";

const isCharacterEditing = ref<boolean>(false);

const userMessage = ref<string>("");

const chatStore = useChatStore();
const { chat, messages, pending } = storeToRefs(chatStore);
const { addUserMessage, deleteAllMessages } = chatStore;

const onClickSend = () => {
    addUserMessage(userMessage.value);
    userMessage.value = "";
};
</script>

<template>
    <div class="grow bg-base-200 flex flex-col">
        <div class="shrink-0 p-2 flex flex-row justify-center gap-4">
            <div class="avatar cursor-pointer">
                <div class="w-12 rounded-full">
                    <img :src="chat?.Character.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div class="grow align-middle grid items-center">
                <p class="text-xl">
                    {{ chat?.Character.name || DEFAULT_CHARACTER_NAME }}
                </p>
            </div>
            <button
                v-show="isCharacterEditing"
                class="btn btn-square"
                @click="isCharacterEditing = false"
            >
                <Icon name="ic:baseline-chat" width="24" height="24" />
            </button>
            <button
                v-show="!isCharacterEditing"
                class="btn btn-square"
                @click="isCharacterEditing = true"
            >
                <Icon name="ic:baseline-person" width="24" height="24" />
            </button>
            <button class="btn btn-square" @click="deleteAllMessages()">
                <Icon name="ic:round-auto-delete" width="24" height="24" />
            </button>
        </div>
        <div class="divider m-0"></div>
        <div v-show="!isCharacterEditing" class="grow min-h-0 flex flex-col">
            <div class="grow min-h-0 p-4">
                <ChatDisplay>
                    <template v-slot:empty>
                        <button class="btn btn-wide" @click="addUserMessage('')">
                            会話をはじめる
                        </button>
                    </template>
                </ChatDisplay>
            </div>
            <div class="divider h-0 m-0"></div>
            <div class="p-4">
                <div class="flex flex-col gap-2">
                    <div class="shrink-0 flex flex-row gap-2 overflow-x-auto">
                        <span
                            v-for="message in SIMULATION_GAME_SAMPLE_USER_MESSAGES"
                            class="btn btn-xs"
                            @click="addUserMessage(message)"
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

<script setup lang="ts">
import { ChatCompletionRequestMessage } from "openai";

const characterName = ref<string>("名前");
const characterAvatarSrc = ref<string>(DEFAULT_CHARACTER_AVATAR);
const prompt = ref<string>("");
const userMessage = ref<string>("");
const messageLogs = ref<Array<ChatCompletionRequestMessage>>([]);

const requestMessages = computed(() => {
    const tmpMessages: Array<ChatCompletionRequestMessage> = [];
    if (prompt.value) {
        tmpMessages.push({
            role: "system",
            content: prompt.value,
        });
    }
    tmpMessages.push(...messageLogs.value);
    return tmpMessages;
});

const { data, pending, execute } = useChatCompletions(requestMessages);

const send = async (message?: string) => {
    if (message) {
        messageLogs.value.push({
            role: "user",
            content: message,
        });
    }
    await execute();
    messageLogs.value.push(data.value.choices[0].message);
};

const onClickStartButton = () => {
    send();
};

const onClickSampleUserMessageButton = (message: string) => {
    send(message);
};
const onClickSend = () => {
    send(userMessage.value);
    userMessage.value = "";
};

const onClickClearButton = () => {
    messageLogs.value = [];
};

const isCharacterEditing = ref<boolean>(false);
const onClickEditButton = () => {
    isCharacterEditing.value = true;
};

const finishEditing = () => {
    isCharacterEditing.value = false;
};
</script>

<template>
    <div class="h-full bg-base-200 flex flex-col">
        <div class="shrink-0 p-2 flex flex-row justify-center gap-4">
            <div class="avatar cursor-pointer">
                <div class="w-12 rounded-full">
                    <img :src="characterAvatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div class="grow align-middle grid items-center">
                <p class="text-xl">
                    {{ characterName }}
                </p>
            </div>
            <div class="flex-none">
                <div class="dropdown dropdown-hover dropdown-end">
                    <label tabindex="0" class="btn btn-square btn-ghost">
                        <Icon name="ph:dots-three-outline-fill" />
                    </label>
                    <ul
                        tabindex="0"
                        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li @click="onClickClearButton()"><a>会話のリセット</a></li>
                        <li @click="onClickEditButton()"><a>キャラクター設定の編集</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="divider h-0 m-0"></div>
        <div v-show="!isCharacterEditing" class="grow min-h-0 flex flex-col">
            <div class="grow min-h-0 p-4">
                <ChatDisplay
                    :messages="messageLogs"
                    :assistantAvatarSrc="characterAvatarSrc"
                    :isAssistantThinking="pending"
                >
                    <template v-slot:empty>
                        <button class="btn btn-wide" @click="onClickStartButton">
                            会話をはじめる
                        </button>
                    </template>
                </ChatDisplay>
            </div>
            <div class="divider h-0 m-0"></div>
            <div class="p-4">
                <div class="shrink-0 flex flex-row gap-2 overflow-x-auto">
                    <span
                        v-for="message in SIMULATION_GAME_SAMPLE_USER_MESSAGES"
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
        </div>
        <div v-show="isCharacterEditing" class="grow p-4">
            <CharacterEditArea
                v-model:name="characterName"
                v-model:avatarSrc="characterAvatarSrc"
                v-model:prompt="prompt"
                @onClickBuckButton="finishEditing"
            ></CharacterEditArea>
        </div>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>

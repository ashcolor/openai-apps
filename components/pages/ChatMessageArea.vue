<script setup lang="ts">
interface Props {
    chatId: number;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "refreshChats"): void;
}
const emit = defineEmits<Emits>();

const isCharacterEditing = ref<boolean>(false);

const userMessage = ref<string>("");

const { chat, messages, pending, refresh, addUserMessage, deleteAllMessages } = await useChat(
    computed(() => props.chatId)
);

const characterId = computed({
    get() {
        if (!chat.value) return -1;
        return chat.value.characterId;
    },
    async set(val: number) {
        const character = await $fetch(`/api/chats/${props.chatId}`, {
            method: "PATCH",
            body: {
                characterId: val,
            },
        });
        await refresh();
        await emit("refreshChats");
    },
});

const onClickSend = () => {
    addUserMessage(userMessage.value);
    userMessage.value = "";
};

const onClickClearButton = async () => {
    await deleteAllMessages();
};

const CharacterSelectRef = ref();

const refreshAll = () => {
    refresh();
    emit("refreshChats");
    CharacterSelectRef.value.refresh();
};
</script>

<template>
    <div class="grow bg-base-200 flex flex-col">
        <div class="shrink-0 p-2 flex flex-row justify-center gap-4">
            <div class="avatar cursor-pointer">
                <div class="w-12 rounded-full">
                    <img :src="chat.Character.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
            <div class="grow align-middle grid items-center">
                <p class="text-xl">
                    {{ chat.Character.name || DEFAULT_CHARACTER_NAME }}
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
            <button class="btn btn-square" @click="onClickClearButton()">
                <Icon name="ic:round-auto-delete" width="24" height="24" />
            </button>
        </div>
        <div class="divider m-0"></div>
        <div v-show="!isCharacterEditing" class="grow min-h-0 flex flex-col">
            <div class="grow min-h-0 p-4">
                <ChatDisplay
                    :messages="messages"
                    :assistantAvatarSrc="chat.Character.avatarSrc"
                    :isAssistantThinking="pending"
                >
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
                <CharacterSelect v-model="characterId" ref="CharacterSelectRef"></CharacterSelect>
                <div class="divider m-0"></div>
                <CharacterEdit
                    :characterId="characterId"
                    @refreshChats="refreshAll"
                    class="grow"
                ></CharacterEdit>
            </div>
        </div>
    </div>
</template>

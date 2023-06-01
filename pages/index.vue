<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";

definePageMeta({
    middleware: ["auth"],
});

const currentView = ref<"chat" | "character">("chat");

const chatStore = useChatStore();
const { chat, selectedChatId } = storeToRefs(chatStore);
</script>

<template>
    <div class="h-full flex flex-row">
        <div class="shrink-0 w-72 flex flex-col place-content-center">
            <div class="w-full text-center">
                <ChatListNewButton></ChatListNewButton>
            </div>
            <ChatList></ChatList>
        </div>

        <div v-if="!selectedChatId" class="grow bg-base-200 grid place-items-center">
            <ChatNewButton></ChatNewButton>
        </div>

        <div v-else="currentView === 'character'" class="grow bg-base-200 flex flex-col">
            <div
                v-if="!chat?.character_id"
                class="grow bg-base-200 flex flex-col place-content-center place-items-center gap-8"
            >
                <ChatCharacterSelectCardGroup></ChatCharacterSelectCardGroup>
            </div>
            <template v-else>
                <div class="shrink-0 w-full p-2 flex flex-row justify-center gap-4">
                    <ChatCharacterAvatar></ChatCharacterAvatar>
                    <ChatCharacterName></ChatCharacterName>
                    <button
                        v-show="currentView === 'character'"
                        class="btn btn-square"
                        @click="currentView = 'chat'"
                    >
                        <Icon name="ic:baseline-chat" width="24" height="24" />
                    </button>
                    <button
                        v-show="currentView === 'chat'"
                        class="btn btn-square"
                        @click="currentView = 'character'"
                    >
                        <Icon name="ic:baseline-person" width="24" height="24" />
                    </button>
                    <ChatMessageDeleteAllButton
                        v-show="currentView === 'chat'"
                    ></ChatMessageDeleteAllButton>
                </div>
                <div class="divider m-0"></div>
                <div v-show="currentView === 'chat'" class="grow min-h-0 flex flex-col">
                    <div class="grow min-h-0 p-4">
                        <ChatDisplay></ChatDisplay>
                    </div>
                    <div class="divider h-0 m-0"></div>
                    <div class="p-4">
                        <div class="flex flex-col gap-2">
                            <ChatMessageTemplateButtonGroup></ChatMessageTemplateButtonGroup>
                            <ChatMessageForm></ChatMessageForm>
                        </div>
                    </div>
                </div>
                <div v-show="currentView === 'character'" class="grow min-h-0 p-4">
                    <div class="h-full flex flex-col">
                        <ChatCharacterDisplay v-show="chat.Character"></ChatCharacterDisplay>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

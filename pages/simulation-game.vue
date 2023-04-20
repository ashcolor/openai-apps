<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";
import { useChatStore } from "~~/stores/useChatStore";
import { useCharacterStore } from "~~/stores/useCharacterStore";

definePageMeta({
    middleware: ["auth"],
});

const systemStore = useSystemStore();
const { isCharacterEditing } = storeToRefs(systemStore);

const chatStore = useChatStore();
const { selectedChatId } = storeToRefs(chatStore);

const characterStore = useCharacterStore();
const { character } = storeToRefs(characterStore);
</script>

<template>
    <div class="h-full flex flex-row">
        <div class="shrink-0 w-72">
            <ChatList></ChatList>
        </div>
        <div v-show="selectedChatId" class="grow bg-base-200 flex flex-col">
            <div class="shrink-0 w-full p-2 flex flex-row justify-center gap-4">
                <CharacterAvatar></CharacterAvatar>
                <CharacterNameHeader></CharacterNameHeader>
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
                <MessageDeleteAllButton></MessageDeleteAllButton>
            </div>
            <div class="divider m-0"></div>
            <div v-show="!isCharacterEditing" class="grow min-h-0 flex flex-col">
                <div class="grow min-h-0 p-4">
                    <ChatDisplay></ChatDisplay>
                </div>
                <div class="divider h-0 m-0"></div>
                <div class="p-4">
                    <div class="flex flex-col gap-2">
                        <MessageTemplateButtonGroup></MessageTemplateButtonGroup>
                        <MessageForm></MessageForm>
                    </div>
                </div>
            </div>
            <div v-show="isCharacterEditing" class="grow min-h-0 p-4">
                <div class="h-full flex flex-col">
                    <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
                        <CharacterSelect></CharacterSelect>
                        <CharacterAddButton></CharacterAddButton>
                    </div>
                    <div class="divider m-0"></div>
                    <div class="grow flex flex-row gap-8">
                        <CharacterEdit v-show="character" class="grow"></CharacterEdit>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="!selectedChatId" class="grow bg-base-200 grid place-items-center">
            <ChatNewButton></ChatNewButton>
        </div>
    </div>
    <SettingsModal></SettingsModal>
</template>

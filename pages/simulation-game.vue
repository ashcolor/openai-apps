<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";

const systemStore = useSystemStore();
const { isCharacterEditing } = storeToRefs(systemStore);
</script>

<template>
    <div class="h-full flex flex-row">
        <div class="w-72">
            <ChatList></ChatList>
        </div>
        <div class="grow bg-base-200 flex flex-col">
            <ChatHeader></ChatHeader>
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
                    <CharacterSelect></CharacterSelect>
                    <div class="divider m-0"></div>
                    <CharacterEdit class="grow"></CharacterEdit>
                </div>
            </div>
        </div>
    </div>
    <SettingsModal></SettingsModal>
</template>

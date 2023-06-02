<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChatStore } from "~~/stores/useChatStore";

const chatStore = useChatStore();
const { chat } = storeToRefs(chatStore);
</script>

<template>
    <div class="grow flex flex-row gap-8">
        <div class="form-control">
            <label class="label">
                <span class="label-text">Profile Picture</span>
            </label>
            <div class="avatar">
                <div class="w-48 rounded-full">
                    <img :src="chat?.Character?.avatar_src || DEFAULT_CHARACTER_AVATAR" />
                </div>
            </div>
        </div>
        <div class="grow flex flex-col">
            <label class="label">
                <span class="label-text">名前</span>
            </label>
            <input
                :value="chat.Character?.name"
                type="text"
                class="input input-sm input-bordered"
                readonly
            />
            <label class="label">
                <span class="label-text">プロンプト</span>
            </label>
            <textarea
                :value="chat.Character?.prompt"
                type="text"
                class="textarea textarea-bordered grow"
                readonly
            ></textarea>
        </div>
    </div>
</template>

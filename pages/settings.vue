<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";

definePageMeta({
    middleware: ["auth"],
});

const systemStore = useSystemStore();
const { openAiApiKey, userAvatarSrc } = storeToRefs(systemStore);
</script>

<template>
    <div class="h-full px-8 py-4 space-y-4">
        <div>
            <h2 class="text-2xl font-bold border-b-4 border-secondary py-4">設定</h2>
        </div>
        <div class="form-control w-full">
            <label class="label">
                <span class="label-text">ユーザアイコン</span>
            </label>
            <AvatarImgWithFileUpload v-model:src="userAvatarSrc"></AvatarImgWithFileUpload>
            <label class="label">
                <span class="label-text">Open AI API Key</span>
            </label>
            <input
                v-model="openAiApiKey"
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
            />
        </div>
    </div>
</template>

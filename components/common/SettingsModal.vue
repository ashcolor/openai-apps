<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "~~/stores/useSystemStore";

const systemStore = useSystemStore();
const { openAiApiKey, userAvatarSrc } = storeToRefs(systemStore);
</script>

<template>
    <Teleport to="body">
        <input type="checkbox" id="settings-modal" class="modal-toggle" />
        <label for="settings-modal" class="modal cursor-pointer">
            <label class="modal-box relative" for="">
                <h3 class="text-lg font-bold">設定</h3>
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
                <div class="modal-action">
                    <label for="settings-modal" class="btn">閉じる</label>
                </div>
            </label>
        </label>
    </Teleport>
</template>

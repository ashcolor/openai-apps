<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useProfileStore } from "~~/stores/useProfileStore";

definePageMeta({
    middleware: ["auth"],
});

const toast = useToast();

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);
const { refresh, patchProfile } = profileStore;

const loading = ref(true);
const openaiApiKey = ref("");
const username = ref("");
const avatar_path = ref("");

await refresh();

if (profile.value) {
    openaiApiKey.value = profile.value?.openai_api_key ?? "";
    username.value = profile.value?.username ?? "";
    avatar_path.value = profile.value?.avatar_url ?? "";
}

loading.value = false;

const updateProfile = async () => {
    try {
        loading.value = true;
        const body = {
            openai_api_key: openaiApiKey.value,
            username: username.value,
            avatar_url: avatar_path.value,
        };
        await patchProfile(body);
        toast.info("保存しました");
    } catch (error) {
        console.error(error);
        toast.error("保存に失敗しました");
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="h-full px-8 py-4 space-y-4">
        <div>
            <h2 class="text-2xl font-bold border-b-4 border-secondary py-4">プロフィール</h2>
        </div>
        <div>
            <form class="form-control space-y-6" @submit.prevent="updateProfile">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">ユーザアイコン</span>
                    </label>
                    <AvatarImgWithFileUpload v-model:src="avatar_path"></AvatarImgWithFileUpload>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        id="email"
                        type="text"
                        :value="profile?.User?.email"
                        class="input"
                        disabled
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Username</span>
                    </label>
                    <input type="text" class="input input-bordered" v-model="username" />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">OpenAI API Key</span>
                    </label>
                    <input type="text" class="input input-bordered" v-model="openaiApiKey" />
                </div>
                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                    更新
                </button>
            </form>
        </div>
    </div>
</template>

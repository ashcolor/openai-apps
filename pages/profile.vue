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
const username = ref("");
const avatarPath = ref("");

await refresh();

if (profile.value) {
    username.value = profile.value?.username ?? "";
    avatarPath.value = profile.value?.avatar_url ?? "";
}

loading.value = false;

const updateProfile = async () => {
    try {
        loading.value = true;
        const body = {
            username: username.value,
            avatar_url: avatarPath.value,
        };
        await patchProfile(body);
        toast.info("保存しました");
    } catch (error) {
        // console.error(error);
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
                    <AvatarImgWithFileUpload v-model:src="avatarPath"></AvatarImgWithFileUpload>
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
                    <input v-model="username" type="text" class="input input-bordered" />
                </div>
                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                    更新
                </button>
            </form>
        </div>
    </div>
</template>

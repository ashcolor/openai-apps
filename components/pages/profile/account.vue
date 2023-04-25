<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_path = ref("");

const user = useSupabaseUser();

const { data: profile, execute, refresh } = await useFetch(`/api/profiles`);

if (profile) {
    username.value = profile.value.username;
    website.value = profile.value.website;
    avatar_path.value = profile.value.avatar_url;
}

loading.value = false;

const updateProfile = async () => {
    try {
        loading.value = true;
        const user = useSupabaseUser();
        const body = {
            id: user.value.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            updated_at: new Date(),
        };

        const profile = await $fetch(`/api/profiles`, {
            method: "PATCH",
            body,
        });
        toast.info("保存しました");
    } catch (error) {
        alert(error.message);
        toast.error("保存に失敗しました");
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="card self-center w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
            <div class="chat-image avatar">
                <div class="w-24 rounded-full ring-1 ring-base-300">
                    <img :src="avatar_path || DEFAULT_USER_AVATAR" />
                </div>
            </div>
        </figure>

        <div class="card-body">
            <form class="form-control space-y-6" @submit.prevent="updateProfile">
                <h2 class="card-title">プロフィール</h2>

                <div class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input id="email" type="text" :value="user.email" class="input" disabled />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input type="text" class="input input-bordered" v-model="username" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Website</span>
                        </label>
                        <input type="text" class="input input-bordered" v-model="website" />
                    </div>
                </div>

                <div class="card-actions">
                    <button
                        type="submit"
                        class="btn btn-primary btn-block"
                        :value="loading ? 'Loading ...' : 'Update'"
                        :disabled="loading"
                    >
                        更新
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

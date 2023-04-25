<script setup lang="ts">
import { useToast } from "vue-toastification/dist/index.mjs";

definePageMeta({
    layout: "auth",
});

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const toast = useToast();

const loading = ref(false);
const email = ref("");
const password = ref("");

const isSend = ref(false);

const handleLogin = async () => {
    try {
        loading.value = true;
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });
        if (error) throw error;
        isSend.value = true;
    } catch (error) {
        console.error(error?.error_description || error?.message);
        toast.error("登録に失敗しました");
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <AuthAppTItleAndDescription></AuthAppTItleAndDescription>

        <div class="card self-center flex md:max-w-xl">
            <div v-if="!isSend" class="card-body bg-base-100 p-16 space-y-3">
                <h2 class="card-title text-2xl">アカウント作成</h2>
                <form @submit.prevent="handleLogin">
                    <div class="space-y-4">
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-medium">Email</span>
                            </label>
                            <input
                                v-model="email"
                                type="text"
                                placeholder="メールアドレス"
                                class="input input-bordered w-full"
                            />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-medium">Password</span>
                            </label>
                            <input
                                v-model="password"
                                type="password"
                                placeholder="パスワード"
                                class="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                class="btn btn-block btn-primary"
                                :value="loading ? 'Loading' : 'Send magic link'"
                            >
                                登録する
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <span class="text-gray-500">アカウントを持っている場合は&nbsp;</span>
                    <NuxtLink to="/auth/login" class="link link-hover link-primary"
                        >ログイン</NuxtLink
                    >
                </div>
            </div>
            <div v-else class="card-body bg-base-100 p-16 space-y-3">
                <div class="card-actions">
                    <button class="btn btn-ghost p-0" @click="isSend = false">
                        <Icon name="charm:arrow-left" width="24" height="24"></Icon>
                    </button>
                </div>
                <h2 class="card-title text-2xl !mt-0">仮登録完了</h2>
                登録確認メールを送信しました。<br />
                メールに記載されているURLにアクセスすると会員登録が完了します。
            </div>
        </div>
    </div>
</template>

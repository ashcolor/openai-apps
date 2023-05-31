<script setup lang="ts">
// @ts-ignore
import { useToast } from "vue-toastification/dist/index.mjs";

definePageMeta({
    layout: "auth",
    auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/" },
});

const { signIn } = useAuth();
const toast = useToast();

const loading = ref(false);
const email = ref("");
const password = ref("");

const handleLogin = async () => {
    try {
        loading.value = true;

        const result = await signIn("credentials", {
            username: email.value,
            password: password.value,
            redirect: false,
        });

        if (result?.error) {
            throw Error(result.error);
        }

        return navigateTo({
            path: "/",
        });
    } catch (error) {
        console.error(error);
        toast.error("ログインに失敗しました");
    } finally {
        loading.value = false;
    }
};

const handleGoogleLogin = async () => {
    await signIn("google", {
        callbackUrl: "/",
    });
};
</script>

<template>
    <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <AuthAppTItleAndDescription></AuthAppTItleAndDescription>

        <div class="card self-center flex">
            <div class="card-body bg-base-100 p-16 space-y-3">
                <h2 class="card-title text-2xl">Appにログイン</h2>
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
                            <label class="label">
                                <span class="label-text-alt"
                                    ><a class="link link-primary link-hover"
                                        >パスワードを忘れた場合はこちら</a
                                    ></span
                                >
                            </label>
                        </div>
                        <!-- <div class="form-control flex flex-row">
                            <label class="label cursor-pointer gap-2">
                                <input type="checkbox" class="checkbox checkbox-sm" />
                                <span class="label-text">Remember me</span>
                            </label>
                        </div> -->
                        <div>
                            <button
                                type="submit"
                                class="btn btn-block btn-primary"
                                :value="loading ? 'Loading' : 'Send magic link'"
                            >
                                ログイン
                            </button>
                        </div>
                    </div>
                </form>
                <div class="divider">または</div>

                <div class="flex flex-col place-content-center">
                    <div class="mx-auto">
                        <button @click="handleGoogleLogin()">
                            <img src="/img/btn_google_signin_light_normal.png" />
                        </button>
                    </div>
                </div>
                <div>
                    <span class="text-gray-500">アカウントを持っていない場合は&nbsp;</span>
                    <NuxtLink to="/auth/signup" class="link link-hover link-primary"
                        >新規登録</NuxtLink
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/useProfileStore";

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);
</script>

<template>
    <div
        v-show="!profile?.openai_api_key"
        class="absolute w-full h-full bg-neutral opacity-75 text-neutral-content grid place-items-center"
    >
        <span> Open AI APIキーが登録されていません。 </span>
        <span
            ><NuxtLink to="/profiles" class="link">プロフィール画面</NuxtLink
            >から登録してください</span
        >
    </div>
</template>

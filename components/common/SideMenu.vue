<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "~~/stores/useProfileStore";

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const listClass = (path: string) => {
    const route = useRoute();

    const isActive = route.path === path;

    return { "bg-base-300": isActive };
};

const onClickLogout = async () => {
    const { signOut } = await useAuth();
    await signOut();
};
</script>

<template>
    <ul class="menu bg-base-100">
        <li :class="listClass('/')">
            <NuxtLink to="/" class="py-4">
                <div class="tooltip tooltip-right" data-tip="チャット">
                    <Icon name="bi:chat-left-text" width="20" height="20"></Icon>
                </div>
            </NuxtLink>
        </li>
        <li :class="listClass('/characters')">
            <NuxtLink to="/characters" class="py-4">
                <div class="tooltip tooltip-right" data-tip="キャラクター">
                    <Icon name="bi:person-badge" width="20" height="20"></Icon>
                </div>
            </NuxtLink>
        </li>
        <li :class="listClass('/settings')">
            <NuxtLink to="/settings" class="py-4">
                <div class="tooltip tooltip-right" data-tip="設定">
                    <Icon name="bi:gear-fill" width="20" height="20"></Icon></div
            ></NuxtLink>
        </li>

        <div class="grow"></div>
        <div class="divider m-0"></div>

        <li :class="listClass('/profile')">
            <NuxtLink to="/profile" class="py-4">
                <div class="tooltip tooltip-right" data-tip="プロフィール">
                    <div class="chat-image avatar">
                        <div class="w-6 rounded-full ring-1 ring-base-300">
                            <img :src="profile?.avatar_url || DEFAULT_USER_AVATAR" />
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </li>
        <li>
            <a @click="onClickLogout()" class="py-4">
                <div class="tooltip tooltip-right" data-tip="ログアウト">
                    <Icon name="material-symbols:logout" width="20" height="20"></Icon></div
            ></a>
        </li>
    </ul>
</template>

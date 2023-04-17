<script setup lang="ts">
const onClickLogout = async () => {
    const supabase = useSupabaseClient();

    await supabase.auth.signOut();

    return navigateTo({
        path: "/signin",
    });
};
</script>

<template>
    <div class="navbar bg-neutral text-neutral-content">
        <div class="flex-none">
            <div class="dropdown">
                <label tabindex="0" class="btn m-1">
                    <Icon name="bi:list" width="24" height="24" />
                </label>
                <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-52"
                >
                    <li>
                        <label>
                            <NuxtLink to="/simulation-game">チャット</NuxtLink>
                        </label>
                    </li>
                    <div class="divider"></div>
                </ul>
            </div>
        </div>
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">AI Tools</a>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn m-1">
                    <Icon name="bi:three-dots" width="24" height="24" />
                </label>
                <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-52"
                >
                    <li>
                        <label>
                            <NuxtLink to="/profile">プロフィール </NuxtLink>
                        </label>
                    </li>
                    <li><label for="settings-modal">設定</label></li>
                    <div class="divider"></div>
                    <li><label @click="onClickLogout">ログアウト</label></li>
                </ul>
            </div>
        </div>
    </div>
</template>

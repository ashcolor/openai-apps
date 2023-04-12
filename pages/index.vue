<script setup lang="ts">
const user = useSupabaseUser();

if (user.value) {
    navigateTo({
        path: "/simulation-game",
    });
} else {
    navigateTo({
        path: "/signin",
    });
}
</script>

<template>
    <div>aaa</div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
});
</script>

<template>
    <div class="h-full px-8 py-4 space-y-4">
        <div>
            <h2 class="text-2xl font-bold border-b-4 border-secondary py-4">設定</h2>
        </div>
        <ProfileAccount></ProfileAccount>
    </div>
</template>

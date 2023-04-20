<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
});
</script>

<template>
    <div class="w-full h-full flex justify-center">
        <ProfileAccount></ProfileAccount>
    </div>
</template>

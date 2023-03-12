<script setup lang="ts">
useHead({
    htmlAttrs: { "data-theme": "garden" },
});
</script>

<template>
    <div class="h-screen flex flex-col">
        <CustomHeader />
        <div class="grow container mx-auto min-h-0">
            <NuxtPage />
        </div>
        <CustomFooter />
    </div>
</template>

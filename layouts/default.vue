<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
});
</script>

<template>
    <div class="h-screen flex flex-col">
        <CustomHeader />
        <div class="grow min-h-0">
            <slot></slot>
        </div>
        <CustomFooter />
    </div>
</template>

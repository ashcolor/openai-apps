<script setup lang="ts"></script>

<template>
    <div class="h-full flex flex-row">
        <div class="w-72">
            <ChatsList></ChatsList>
        </div>
        <ChatMessageArea></ChatMessageArea>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>

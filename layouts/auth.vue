<script setup lang="ts"></script>

<template>
    <div class="h-screen flex flex-col">
        <div
            class="min-h-0 bg-[linear-gradient(to_bottom,rgba(0,0,100,.5),rgba(0,0,0,09)),url('/assets/img/bg.jpg')] bg-no-repeat bg-cover bg-center"
        >
            <slot></slot>
        </div>
        <CustomFooter />
    </div>
</template>

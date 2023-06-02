<script setup lang="ts"></script>

<template>
    <div class="h-screen flex flex-col">
        <CustomHeader />
        <div class="grow min-h-0 flex flex-row">
            <SideMenu></SideMenu>
            <div class="divider divider-horizontal w-1 m-0"></div>
            <div class="grow min-w-0">
                <slot></slot>
            </div>
        </div>
        <CustomFooter />
    </div>
</template>

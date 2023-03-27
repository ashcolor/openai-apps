<script setup lang="ts">
interface Props {
    isActive?: boolean;
    isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
    isDisabled: false,
});

const classList = computed(() => {
    return {
        "btn-outline": !props.isActive,
        "btn-disabled": props.isDisabled,
    };
});
</script>
<template>
    <button class="btn grow" :class="classList">
        <slot></slot>
    </button>
</template>

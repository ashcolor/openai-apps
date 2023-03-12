<script setup lang="ts">
type ButtonProps = {
    value: string;
    label: string;
};

interface Props {
    list: Array<string>;
    modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "update:modelValue", value: string): void;
}
const emit = defineEmits<Emits>();

const onClick = (value) => {
    emit("update:modelValue", value);
};
</script>
<template>
    <div class="btn-group">
        <ToggleButton
            v-for="button in list"
            :isActive="button === props.modelValue"
            class="grow"
            @click="onClick(button)"
        >
            {{ button }}
        </ToggleButton>
    </div>
</template>

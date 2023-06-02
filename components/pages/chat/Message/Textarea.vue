<script setup lang="ts">
interface Props {
    modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "update:modelValue", value: string): void;
    (e: "onKeyDownEnter"): void;
}
const emit = defineEmits<Emits>();

const handleInput = computed({
    set(val: string) {
        emit("update:modelValue", val);
    },
    get() {
        return props.modelValue;
    },
});

const keyDownEnter = (e: any) => {
    e.preventDefault();
    emit("onKeyDownEnter");
};
const keyUpEnter = (e: any) => {
    e.preventDefault();
};
const keyEnterShift = () => {};
</script>

<template>
    <textarea
        v-model="handleInput"
        class="textarea w-full"
        placeholder="文字を入力"
        @keydown.enter.exact="keyDownEnter"
        @keyup.enter.exact="keyUpEnter"
        @keydown.enter.shift="keyEnterShift"
    ></textarea>
</template>

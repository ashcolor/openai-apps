<script setup lang="ts">
interface Props {
    modelValue: number;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "update:modelValue", value: number): void;
}
const emit = defineEmits<Emits>();

const handleInput = computed({
    set(val: number) {
        emit("update:modelValue", val);
    },
    get() {
        return props.modelValue;
    },
});

const { data: characterOptions, pending, error, refresh } = await useFetch("/api/characters");

const onClickAddButton = async () => {
    const character = await $fetch("/api/characters", {
        method: "POST",
    });
    await refresh();
};
</script>

<template>
    <div class="flex flex-row flex-wrap gap-2 justify-center place-items-center">
        <label v-for="option in characterOptions" class="label p-0">
            <div class="indicator cursor-pointer flex flex-row gap-2 place-items-center px-2">
                <input
                    v-model="handleInput"
                    type="radio"
                    name="charactrerId"
                    class="radio"
                    :value="option.id"
                />
                <div class="avatar">
                    <div class="w-6 rounded-full">
                        <img :src="option.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                    </div>
                </div>
                <span class="label-text">{{ option.name || "名称未設定" }}</span>
            </div>
        </label>
        <button class="btn btn-xs btn-circle btn-outline" type="button" @click="onClickAddButton">
            <Icon name="ic:twotone-plus" />
        </button>
    </div>
</template>

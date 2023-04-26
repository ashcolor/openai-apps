<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/useProfileStore";

interface Props {
    modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "update:modelValue", value: string): void;
    (e: "onKeyDownEnter"): void;
}
const emit = defineEmits<Emits>();

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

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
const keyEnterShift = (e: any) => {};
</script>

<template>
    <div class="relative">
        <div
            v-show="!profile?.openai_api_key"
            class="absolute w-full h-full bg-neutral opacity-75 text-neutral-content grid place-items-center"
        >
            <span> Open AI APIキーが登録されていません。 </span>
            <span
                ><NuxtLink to="/profiles" class="link">プロフィール画面</NuxtLink
                >から登録してください</span
            >
        </div>
        <textarea
            class="textarea w-full"
            placeholder="文字を入力"
            v-model="handleInput"
            @keydown.enter.exact="keyDownEnter"
            @keyup.enter.exact="keyUpEnter"
            @keydown.enter.shift="keyEnterShift"
        ></textarea>
    </div>
</template>

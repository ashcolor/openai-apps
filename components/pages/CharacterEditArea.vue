<script setup lang="ts">
import { useStorage } from "@vueuse/core";

interface Props {
    name: string;
    avatarSrc: string;
    prompt: string;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "update:name", value: string): void;
    (e: "update:avatarSrc", value: string): void;
    (e: "update:prompt", value: string): void;
    (e: "onClickBuckButton"): void;
}
const emit = defineEmits<Emits>();

const name = ref<string>("");
const avatarSrc = ref<string>("");
const prompt = ref<string>("");
const selectedCharacterId = ref<number>(1);

const selectedCharacter = computed(() => {
    return characterOptions.value.find((element) => element.id === selectedCharacterId.value);
});

const isEdited = computed(() => {
    return !(
        selectedCharacter.value?.name === name.value &&
        selectedCharacter.value?.avatarSrc === avatarSrc.value &&
        selectedCharacter.value?.prompt === prompt.value
    );
});

const characterOptions = useStorage("myCaracters", SIMULATION_GAME_DEFAULT_CHARACTERS);

watch(
    selectedCharacterId,
    (newValue, oldValue) => {
        name.value = selectedCharacter.value?.name ?? "";
        avatarSrc.value = selectedCharacter.value?.avatarSrc ?? "";
        prompt.value = selectedCharacter.value?.prompt ?? "";
    },
    {
        immediate: true,
    }
);

const onClickCharacterSelect = (event: Event) => {
    if (name.value !== "" && isEdited.value) {
        if (!confirm("変更内容が破棄されます。本当によろしいですか？")) {
            event.preventDefault();
        }
    }
};

watchEffect(() => {
    emit("update:name", name.value);
    emit("update:avatarSrc", avatarSrc.value);
    emit("update:prompt", prompt.value);
});

const onClickSave = () => {
    if (!selectedCharacter.value) return;
    selectedCharacter.value.name = name.value;
    selectedCharacter.value.avatarSrc = avatarSrc.value;
    selectedCharacter.value.prompt = prompt.value;
};
</script>

<template>
    <div class="h-full flex flex-col">
        <button class="btn" @click="emit('onClickBuckButton')">戻る</button>
        <div class="flex flex-row gap-2 justify-center">
            <label v-for="option in characterOptions" class="label">
                <div class="indicator cursor-pointer gap-2 px-2">
                    <span
                        v-show="option.id === selectedCharacterId && isEdited"
                        class="indicator-item badge badge-xs badge-warning"
                    ></span>
                    <input
                        v-model="selectedCharacterId"
                        type="radio"
                        class="radio"
                        :value="option.id"
                        @click="onClickCharacterSelect($event)"
                    />
                    <span class="label-text">{{ option.name || "名称未設定" }}</span>
                </div>
            </label>
        </div>
        <div class="divider"></div>
        <div class="grow flex flex-row gap-8">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Profile Picture</span>
                </label>
                <AvatarImgWithFileUpload v-model:src="avatarSrc"></AvatarImgWithFileUpload>
            </div>
            <div class="form-control grow flex flex-col">
                <label class="label">
                    <span class="label-text">名前</span>
                </label>
                <input
                    v-model="name"
                    type="text"
                    placeholder="Type here"
                    class="input input-sm input-bordered"
                />
                <label class="label">
                    <span class="label-text">プロンプト</span>
                </label>
                <textarea
                    v-model="prompt"
                    type="text"
                    placeholder="Type here"
                    class="textarea textarea-bordered grow"
                ></textarea>
                <button
                    type="button"
                    class="btn btn-outlinew-full"
                    :class="{ 'btn-disabled': !isEdited }"
                    @click="onClickSave"
                >
                    保存
                </button>
            </div>
        </div>
    </div>
</template>

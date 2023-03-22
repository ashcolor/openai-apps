<script setup lang="ts">
import { Characters } from ".prisma/client";

interface Props {
    characterId: number;
    name: string;
    avatarSrc: string;
    prompt: string;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "update:name", value: string): void;
    (e: "update:avatarSrc", value: string): void;
    (e: "update:prompt", value: string): void;
    (e: "refreshChats"): void;
}
const emit = defineEmits<Emits>();

const name = ref<string>("");
const avatarSrc = ref<string>("");
const prompt = ref<string>("");

const {
    data: selectedCharacter,
    pending: p,
    refresh: selectedCharacterRefresh,
} = await useFetch<Characters>(computed(() => `/api/characters/${props.characterId}`));

watch(selectedCharacter, () => {
    name.value = selectedCharacter.value?.name || "";
    avatarSrc.value = selectedCharacter.value?.avatarSrc || "";
    prompt.value = selectedCharacter.value?.prompt || "";
});

const onClickSave = async () => {
    const character = await $fetch(`/api/characters/${props.characterId}`, {
        method: "PATCH",
        body: {
            name: name.value,
            avatarSrc: avatarSrc.value,
            prompt: prompt.value,
        },
    });
    // await characterOptionsRefresh();
    await selectedCharacterRefresh();
};

// const onClickDeleteButton = async () => {
//     const character = await $fetch(`/api/characters/${props.characterId}`, {
//         method: "DELETE",
//     });
//     // await characterOptionsRefresh();
//     // selectedCharacterId.value = 1;
//     emit("refreshChats");
// };
</script>

<template>
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
            <button type="button" class="btn btn-outlinew-full" @click="onClickSave">保存</button>
            <label class="label">
                <span class="label-text">削除</span>
            </label>
            <!-- <button
                type="button"
                class="btn btn-error btn-outlinew-full"
                @click="onClickDeleteButton"
            >
                削除
            </button> -->
        </div>
    </div>
</template>

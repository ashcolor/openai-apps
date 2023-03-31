<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "~~/stores/useCharacterStore";

const characterStore = useCharacterStore();
const { character } = storeToRefs(characterStore);
const { patchCharacter } = characterStore;

const name = ref<string>("");
const avatarSrc = ref<string>("");
const prompt = ref<string>("");

watch(
    character,
    () => {
        name.value = character.value?.name || "";
        avatarSrc.value = character.value?.avatarSrc || "";
        prompt.value = character.value?.prompt || "";
    },
    {
        immediate: true,
    }
);

const onClickSave = async () => {
    await patchCharacter({
        name: name.value,
        avatarSrc: avatarSrc.value,
        prompt: prompt.value,
    });
};
</script>

<template>
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
        <button type="button" class="btn btn-outlinew-full" @click="onClickSave()">保存</button>
        <div class="divider"></div>
        <CharacterDeleteButton></CharacterDeleteButton>
    </div>
</template>

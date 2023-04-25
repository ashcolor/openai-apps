<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useCharacterStore } from "~~/stores/useCharacterStore";

definePageMeta({
    middleware: ["auth"],
});

const breadcrumbs = [
    {
        name: "キャラクター一覧",
        path: "/characters",
        icon: "bi:folder",
    },
    {
        name: "キャラクター編集",
        icon: "bi:folder",
    },
];

const toast = useToast();
const route = useRoute();
const id = parseInt(route.params.id ?? "");

const characterStore = useCharacterStore();
const { selectedCharacterId, character } = storeToRefs(characterStore);
const { refresh, patchCharacter } = characterStore;

selectedCharacterId.value = id;
await refresh();

if (!character.value) {
    navigateTo({ path: "/characters" });
}

const name = ref<string>(character.value?.name ?? "");
const avatarSrc = ref<string>(character.value?.avatar_src ?? "");
const prompt = ref<string>(character.value?.prompt ?? "");

const onClickSave = async () => {
    try {
        await patchCharacter({
            name: name.value,
            avatar_src: avatarSrc.value,
            prompt: prompt.value,
        });
        toast.info("保存しました");
    } catch (e) {
        toast.error("保存に失敗しました");
    }
};
</script>

<template>
    <div class="h-full px-8 py-4 flex flex-col gap-4">
        <div><Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs></div>
        <div>
            <h2 class="text-2xl font-bold border-b-4 border-secondary pb-4">キャラクター編集</h2>
        </div>
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
                <div class="mt-4">
                    <button type="button" class="btn w-full" @click="onClickSave(character.id)">
                        保存
                    </button>
                </div>
                <div class="divider"></div>
                <CharacterDeleteButton></CharacterDeleteButton>
            </div>
        </div>
    </div>
</template>

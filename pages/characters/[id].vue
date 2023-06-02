<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useCharacterStore } from "~~/stores/useCharacterStore";

definePageMeta({
    middleware: ["auth"],
});

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
const templates = ref<Array<Object>>(character.value.Templates);

const onClickSave = async () => {
    try {
        await patchCharacter({
            name: name.value,
            avatar_src: avatarSrc.value,
            prompt: prompt.value,
            templates: templates.value,
        });
        toast.info("保存しました");
    } catch (e) {
        toast.error("保存に失敗しました");
    }
};

const onClickAddTemplateButton = () => {
    templates.value.push({
        id: null,
        title: "",
        content: "",
    });
};

const onClickDeleteTemplateButton = (index: number) => {
    templates.value.splice(index, 1);
};
</script>

<template>
    <div class="h-full px-8 py-4 flex flex-col gap-4">
        <div>
            <div class="border-b-4 border-secondary pb-4 flex flex-row items-center gap-2">
                <NuxtLink to="/characters" class="flex items-center">
                    <button class="btn btn-sm btn-ghost px-2">
                        <Icon name="bi:chevron-left" width="24" height="32"></Icon>
                    </button>
                </NuxtLink>
                <h2 class="inline text-2xl font-bold">キャラクター編集</h2>
            </div>
        </div>
        <div class="grow min-h-0 flex flex-row gap-8">
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Profile Picture</span>
                </label>
                <AvatarImgWithFileUpload v-model:src="avatarSrc"></AvatarImgWithFileUpload>
            </div>
            <div class="grow min-h-0 flex flex-col gap-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">名前</span>
                    </label>
                    <input
                        v-model="name"
                        type="text"
                        placeholder="Type here"
                        class="input input-sm input-bordered"
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">プロンプト</span>
                    </label>
                    <textarea
                        v-model="prompt"
                        type="text"
                        placeholder="Type here"
                        class="textarea textarea-bordered h-96"
                    ></textarea>
                </div>
                <div class="grow min-h-0 form-control">
                    <label class="label">
                        <span class="label-text">定型文</span>
                    </label>
                    <div class="space-y-2 overflow-auto">
                        <div v-for="(template, index) in templates" :key="template.id"  class="">
                            <div class="input-group">
                                <span>タイトル</span>
                                <input
                                    v-model="template.title"
                                    type="text"
                                    placeholder="タイトル"
                                    class="grow input input-bordered"
                                />
                                <button
                                    class="btn btn-outline"
                                    @click="onClickDeleteTemplateButton(index)"
                                >
                                    <Icon name="bi:trash"></Icon>
                                </button>
                            </div>
                            <textarea
                                v-model="template.content"
                                type="text"
                                placeholder="内容"
                                class="textarea textarea-bordered w-full h-18"
                            />
                        </div>
                        <div
                            class="btn btn-block btn-sm btn-outline"
                            @click="onClickAddTemplateButton"
                        >
                            <Icon name="bi:plus-circle"></Icon>
                        </div>
                    </div>
                </div>
                <div>
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

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharactersStore } from "~~/stores/useCharactersStore";

definePageMeta({
    middleware: ["auth"],
});

const charactersStore = useCharactersStore();
const { addCharacter, deleteCharacter } = charactersStore;
const { characters } = storeToRefs(charactersStore);
</script>

<template>
    <div class="h-full px-8 py-4 space-y-4">
        <div>
            <h2 class="text-2xl font-bold border-b-4 border-secondary py-4">キャラクター一覧</h2>
        </div>
        <div class="flex flex-row place-content-between">
            <div></div>
            <div>
                <button class="btn" @click="addCharacter()">新規作成</button>
            </div>
        </div>
        <div class="border-2">
            <table class="table w-full">
                <!-- head -->
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>アバター</th>
                        <th>名前</th>
                        <th>プロンプト</th>
                        <!-- <th>テンプレート</th> -->
                        <th>編集</th>
                        <th>削除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="character in characters">
                        <th>{{ character.id }}</th>
                        <td>
                            <div class="avatar">
                                <div class="w-12 rounded-full">
                                    <img :src="character.avatar_src || DEFAULT_CHARACTER_AVATAR" />
                                </div>
                            </div>
                        </td>
                        <td>{{ character.name }}</td>
                        <td>{{ character.prompt }}</td>
                        <!-- <td></td> -->
                        <td>
                            <button class="btn btn-square btn-ghost">
                                <NuxtLink :to="`/characters/edit${character.id}`">
                                    <Icon name="bi:pencil-square" width="24" height="24"></Icon>
                                </NuxtLink>
                            </button>
                        </td>
                        <td>
                            <button
                                class="btn btn-square btn-ghost"
                                @click="deleteCharacter(character.id)"
                            >
                                <Icon name="bi:trash" width="24" height="24"></Icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
const keyword = ref("こんにちは");
const messages = ref<Array<any>>([]);
const time = ref("夕食");
const genre = ref("洋食");
const likeFoods = ref<Array<string>>([""]);
const dislikeFoods = ref<Array<string>>([""]);

const displayMessages = computed(() => {
    let tmpMessages: Array<any> = [];
    tmpMessages.push({
        role: "assistant",
        content: "どんなご飯を食べたいですか？",
    });
    tmpMessages.push(...messages.value);
    if (pending.value) {
        tmpMessages.push({
            role: "assistant",
            content: "...",
        });
    }
    return tmpMessages;
});

const { data, pending, execute } = useChatCompletions(messages);

const userMessage = computed(() => {
    let message = "";
    message += `${time.value}の料理を10個上げてください。${genre.value}でお願いします。`;

    if (likeFoods.value.filter(Boolean).length !== 0) {
        message += `食材は${likeFoods.value.filter(Boolean).join()}を使います。`;
    }

    return message;
});

const send = async () => {
    messages.value.push({
        role: "user",
        content: userMessage.value,
    });

    await execute();
    messages.value.push(data.value.choices[0].message);
};
</script>

<template>
    <div class="h-full flex flex-col">
        <h2 class="mb-2 text-xl font-bold flex flex-row items-center gap-2">
            <Icon name="zondicons:location-food" /><span>ご飯提案AI</span>
        </h2>
        <ChatDisplay :messages="displayMessages"></ChatDisplay>
        <div class="flex flex-col gap-2">
            <div>
                <TemplateTypeHead> <Icon name="wi:time-4" />時間 </TemplateTypeHead>
                <ToggleButtonGroup :list="['朝食', '昼食', '夕食']" v-model="time" class="w-full" />
            </div>
            <div>
                <TemplateTypeHead><Icon name="tabler:world" />ジャンル</TemplateTypeHead>
                <ToggleButtonGroup
                    :list="['和食', '洋食', '中華', 'イタリアン']"
                    v-model="genre"
                    class="w-full"
                />
            </div>
            <div class="flex flex-row flex-1">
                <div class="flex-1">
                    <TemplateTypeHead><Icon name="ph:thumbs-up" />食べたい食材</TemplateTypeHead>
                    <div class="flex flex-col gap-1">
                        <div class="flex flex-row items-center">
                            <input
                                v-for="(likeFood, index) in likeFoods"
                                v-model="likeFoods[index]"
                                type="text"
                                placeholder="Type here"
                                class="input input-sm input-bordered grow"
                            />
                            <button class="m-2 grid places-items-center">
                                <Icon name="mdi:minus-circle" />
                            </button>
                        </div>
                        <button
                            type="button"
                            class="btn btn-outline btn-xs w-full"
                            @click="likeFoods.push('')"
                        >
                            <Icon name="mdi:plus-circle" />
                        </button>
                    </div>
                </div>
                <div class="flex-1">
                    <TemplateTypeHead
                        ><Icon name="ph:thumbs-down" />食べたくない食材</TemplateTypeHead
                    >
                    <div class="flex flex-col gap-1">
                        <input
                            v-for="(dislikeFood, index) in dislikeFoods"
                            v-model="dislikeFoods[index]"
                            type="text"
                            placeholder="Type here"
                            class="input input-sm input-bordered w-full"
                        />
                        <button
                            type="button"
                            class="btn btn-outline btn-xs w-full"
                            @click="dislikeFoods.push('')"
                        >
                            <Icon name="ep:circle-plus-filled" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="w-full">
                    <button class="btn btn-md w-full" @click="send">送信</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>

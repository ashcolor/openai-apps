<script setup lang="ts">
const chatId = useLocalStorage("chatId", 1);
const { chats, refresh, addChat, deleteChat } = await useChats();
</script>

<template>
    <div class="h-full flex flex-row">
        <div class="w-72">
            <ul class="menu bg-base-100 h-full overflow-y-auto flex flex-col flex-nowrap">
                <li v-for="chat in chats" @click="chatId = chat.id">
                    <div
                        class="w-full flex flex-row flex-nowrap"
                        :class="{ active: chatId === chat.id }"
                    >
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img :src="chat.Character.avatarSrc || DEFAULT_CHARACTER_AVATAR" />
                            </div>
                        </div>
                        <div class="grow shrink min-w-0">
                            <div>{{ chat.Character.name }}</div>
                            <div class="text-sm font-light truncate">
                                {{ chat.Messages[0]?.content }}
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-xs btn-ghost" @click="deleteChat(chat.id)">
                                <Icon name="ic:outline-close" width="16" height="16"></Icon>
                            </button>
                        </div>
                    </div>
                </li>
                <button class="btn btn-sm btn-outline" @click="addChat()">新しいチャット</button>
            </ul>
        </div>
        <ChatMessageArea :chatId="chatId" @refreshChats="refresh"></ChatMessageArea>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>

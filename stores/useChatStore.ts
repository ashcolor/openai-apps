import { defineStore, storeToRefs } from "pinia";
import { useChatsStore } from "~~/stores/useChatsStore";
import { useCharacterStore } from "./useCharacterStore";
import { ChatCompletionRequestMessage } from "openai";
import { Chat } from "@prisma/client";

export const useChatStore = defineStore("chat", () => {
    const chatsStore = useChatsStore();
    const characterStore = useCharacterStore();
    const { selectedCharacterId } = storeToRefs(characterStore);

    const messages = ref<Array<ChatCompletionRequestMessage>>([]);
    const pending = ref<boolean>(false);

    const selectedChatId = ref<number>(1);
    const { data: chat, refresh } = useFetch<Chat>(
        computed(() => `/api/chats/${selectedChatId.value}`)
    );

    watch(
        chat,
        () => {
            if (!chat.value) {
                messages.value = [];
            } else {
                selectedCharacterId.value = chat.value.characterId;
                messages.value = chat.value.Messages;
            }
        },
        {
            immediate: true,
        }
    );

    const addUserMessage = async (content: string) => {
        messages.value.push({
            role: "user",
            content: content,
        });

        const message = await $fetch(`/api/chats/user-message/${selectedChatId.value}`, {
            method: "POST",
            body: { content },
            async onRequest({ request, options }) {
                pending.value = true;
            },
            async onRequestError({ request, options, error }) {
                pending.value = false;
            },
            async onResponse({ request, response, options }) {
                pending.value = false;
            },
            async onResponseError({ request, response, options }) {
                pending.value = false;
            },
        });
        messages.value.push(message);
        refresh();
        chatsStore.refresh();
    };

    const deleteAllMessages = async () => {
        const message = await $fetch(`/api/chats/messages/${selectedChatId.value}`, {
            method: "DELETE",
        });
        messages.value = [];
        refresh();
        chatsStore.refresh();
    };

    const setCharacter = async (characterId: number) => {
        const character = await $fetch(`/api/chats/${selectedChatId.value}`, {
            method: "PATCH",
            body: {
                characterId: characterId,
            },
        });
        refresh();
        chatsStore.refresh();
    };
    return {
        selectedChatId,
        chat,
        messages,
        pending,
        refresh,
        addUserMessage,
        deleteAllMessages,
        setCharacter,
    };
});

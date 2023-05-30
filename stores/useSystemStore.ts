import { defineStore } from "pinia";

export const useSystemStore = defineStore("system", () => {
    const userMessageInput = ref<string>("");

    return {
        userMessageInput,
    };
});

import { defineStore, storeToRefs, skipHydrate } from "pinia";

export const useSystemStore = defineStore("system", () => {
    const openAiApiKey = useLocalStorage("open-ai-api-key", "");
    const userAvatarSrc = useLocalStorage("user-avatar-src", "");

    return {
        // @https://pinia.vuejs.org/cookbook/composables.html#ssr
        openAiApiKey: skipHydrate(openAiApiKey),
        userAvatarSrc: skipHydrate(userAvatarSrc),
    };
});

import { defineStore, skipHydrate, storeToRefs } from "pinia";
import { profiles } from "@prisma/client";

export const useProfileStore = defineStore("chat", () => {
    const {
        data: profile,
        execute,
        refresh,
    } = useFetch<profiles>("/api/profiles", {
        immediate: false,
    });

    const patchProfile = async (body: Object) => {
        const savedProfile = await $fetch("/api/profiles", {
            method: "PATCH",
            body,
        });
    };

    return {
        profile,
        refresh,
        patchProfile,
    };
});

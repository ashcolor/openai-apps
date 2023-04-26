import { defineStore, skipHydrate, storeToRefs } from "pinia";
import { profiles } from "@prisma/client";

export const useProfileStore = defineStore("profile", () => {
    const { data: profile, execute, refresh } = useFetch<profiles>("/api/profiles");

    const patchProfile = async (body: Object) => {
        const savedProfile = await $fetch("/api/profiles", {
            method: "PATCH",
            body,
        });
        await refresh();
    };

    return {
        profile,
        refresh,
        patchProfile,
    };
});

import { defineStore } from "pinia";
import { profiles } from "@prisma/client";

export const useProfileStore = defineStore("profile", () => {
    const { data: profile, refresh } = useFetch<profiles>("/api/profiles");

    const patchProfile = async (body: Object) => {
        await $fetch("/api/profiles", {
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

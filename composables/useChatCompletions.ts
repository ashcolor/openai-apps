import { Ref } from "nuxt/dist/app/compat/capi";

export const useChatCompletions = (messages: Ref<any>) => {
    const data = ref<any>([]);
    const pending = ref<boolean>(false);

    const execute = async () => {
        const responseData = await $fetch("/api/generate", {
            method: "POST",
            body: messages.value,
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
        data.value = responseData;
    };

    return { data, pending, execute };
};

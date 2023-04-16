// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/devtools",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/supabase",
        "nuxt-icon",
    ],
    components: {
        dirs: ["~/components/common", "~/components/pages", "~/components/parts"],
    },
    build: {
        transpile: ["vue-toastification"],
    },
});

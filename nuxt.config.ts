// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/devtools",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@sidebase/nuxt-auth",
        "nuxt-icon",
        "@nuxtjs/eslint-module",
    ],
    components: {
        dirs: ["~/components/common", "~/components/pages", "~/components/parts"],
    },
    build: {
        transpile: ["vue-toastification"],
    },
    // see @https://sidebase.io/nuxt-auth/configuration/nuxt-config
    auth: {},
});

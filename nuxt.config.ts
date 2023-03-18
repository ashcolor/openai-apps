// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/devtools", "@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-icon"],
    components: {
        dirs: ["~/components/pages", "~/components/uiParts"],
    },
    runtimeConfig: {
        public: {
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        },
    },
});

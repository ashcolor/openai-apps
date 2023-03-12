// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-icon"],
    components: {
        dirs: ["~/components/pages", "~/components/uiParts"],
    },
});

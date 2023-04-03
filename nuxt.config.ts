// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        preset: "aws-lambda",
        serveStatic: true,
    },
    modules: ["@nuxt/devtools", "@vueuse/nuxt", "@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-icon"],
    components: {
        dirs: ["~/components/common", "~/components/pages", "~/components/parts"],
    },
});

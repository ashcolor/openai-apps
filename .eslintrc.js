module.exports = {
    root: true,
    extends: ["@nuxtjs/eslint-config-typescript", "prettier"],
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                "vue/no-v-html": 0,
            },
        },
        {
            files: ["*.vue"],
            rules: {
                "vue/no-multiple-template-root": 0,
            },
        },
    ],
    rules: {},
};

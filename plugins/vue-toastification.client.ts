import Toast, { PluginOptions } from "vue-toastification";
import { TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        transition: "fade",
    });
});
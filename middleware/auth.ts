export default defineNuxtRouteMiddleware((to, from) => {
    if (process.env.NODE_ENV === "development") return;

    const user = useSupabaseUser();

    if (!user.value && to.path !== "/auth/login") {
        return navigateTo({
            path: "/auth/login",
        });
    }
});

export default defineNuxtRouteMiddleware((to, from) => {
    const { data } = useAuth();

    if (!data.value?.user) {
        return navigateTo({
            path: "/auth/login",
        });
    }
});

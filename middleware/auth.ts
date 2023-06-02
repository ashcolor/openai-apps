export default defineNuxtRouteMiddleware(() => {
    const { data } = useAuth();

    if (!data.value?.user) {
        return navigateTo({
            path: "/auth/login",
        });
    }
});

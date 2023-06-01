import { getToken } from "#auth";

export default defineEventHandler(async (event) => {
    const path = event.path;

    if (path.indexOf("/api") === 0 && !path.includes("/api/auth")) {
        try {
            const token = await getToken({ event });

            const userId = token?.userId;

            if (!userId) {
                return { status: "unauthenticated!" };
            }

            event.context.userId = userId;
        } catch (e) {
            // console.error(e);
            throw createError({
                statusCode: 401,
                statusMessage: "トークンが不正です",
            });
        }
    }
});

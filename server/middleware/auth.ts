import { getToken, getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
    const path = event.path;

    if (path.indexOf("/api") === 0 && !path.includes("/api/auth")) {
        try {
            // TODO Vercel上ではtokenがnullになるためJWTの使用は保留
            const secret = process.env.AUTH_SECRET;
            const secureCookie = import.meta.env.PROD as boolean;
            const token = await getToken({
                event,
                secret,
                secureCookie,
            });

            // console.log("token", token);

            const userId = token?.userId;

            // const session = await getServerSession(event);
            // console.log("session", session);

            // const userId = session?.user.id;

            if (!userId) {
                throw new Error("unauthenticated!");
            }

            event.context.userId = userId;
        } catch (e) {
            // console.error(e);
            throw createError({
                statusCode: 401,
                statusMessage: e?.message || "エラーが発生しました",
            });
        }
    }
});

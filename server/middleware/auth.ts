import { getServerSession } from "#auth";
import { getToken } from "next-auth/jwt";

export default defineEventHandler(async (event) => {
    const path = event.path;

    if (path.indexOf("/api") === 0 && path.indexOf("/api/auth") === -1) {
        try {
            // TODO JWTからuserIdを取得したい
            // nuxt-authのgetTokenではエラー、next-authの場合はデータが空になっている
            // const req = event.node.req;
            // const token = await getToken({ req });
            // console.log("token", token);

            const session = await getServerSession(event);
            const userId = session?.user.id;

            console.log(userId);

            if (!userId) {
                return { status: "unauthenticated!" };
            }

            event.context.userId = userId;
        } catch (e) {
            console.error(e);
            throw createError({
                statusCode: 401,
                statusMessage: "トークンが不正です",
            });
        }
    }
});

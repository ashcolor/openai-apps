import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
    try {
        const cookies = parseCookies(event);
        const accessToken = cookies["sb-access-token"];

        const supabaseURL = import.meta.env.SUPABASE_URL;
        const supabaseKey = import.meta.env.SUPABASE_KEY;
        const supabase = createClient(supabaseURL, supabaseKey);
        const { data: user } = await supabase.auth.getUser(accessToken);

        if (!user.user) throw Error;

        const userId = user.user?.id;
        event.context.userId = userId;
    } catch (e) {
        console.log(e);

        throw createError({
            statusCode: 401,
            statusMessage: "トークンが不正です",
        });
    }
});

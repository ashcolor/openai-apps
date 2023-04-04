export default defineEventHandler((event) => {
    const authorizationString = getRequestHeader(event, "authorization");
    const base64Credentials = authorizationString?.split(" ")?.[1];

    if (base64Credentials) {
        const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
        const [username, password] = credentials.split(":");

        if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD)
            return;
    }

    setHeader(event, "WWW-Authenticate", 'Basic realm="Secure Area"');
    throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
    });
});

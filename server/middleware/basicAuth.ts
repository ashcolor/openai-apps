export default defineEventHandler((event) => {
    const base64Credentials = event.req.headers?.authorization?.split(" ")?.[1];

    if (base64Credentials) {
        const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
        const [username, password] = credentials.split(":");

        if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD)
            return;
    }

    event.res.statusCode = 401;
    event.res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    event.res.end("Unauthorized");
});

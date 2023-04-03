module.exports.handler = (event, context, callback) => {
    const authorizationHeader = event.headers.Authorization;
    if (!authorizationHeader) {
        return callback("Unauthorized");
    }

    const encodedCredentials = authorizationHeader.split(" ")[1];
    const [username, password] = Buffer.from(encodedCredentials, "base64").toString().split(":");

    if (!(username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD)) {
        return callback("Unauthorized");
    }

    const authResponse = buildPolicy(event, username);
    callback(null, authResponse);
};

function buildPolicy(event, principalId) {
    const [identifier, service, action, region, accountId, apiGatewayArn] =
        event.methodArn.split(":");
    const [apiId, stage, ..._rest] = apiGatewayArn.split("/");

    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: [
                        `${identifier}:${service}:${action}:${region}:${accountId}:${apiId}/${stage}/*/*`,
                    ],
                },
            ],
        },
    };
}

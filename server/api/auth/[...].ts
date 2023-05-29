import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";

import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt", // jwtにする
    },
    providers: [
        // GoogleProvider.default({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        // GithubProvider.default({
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        // }),
        CredentialsProvider.default({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "tarou" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials: Record<"username" | "password", string> | undefined,
                req: any
            ) {
                const email = credentials?.username;
                const plainPassword = credentials?.password || "";

                const prisma = new PrismaClient();

                try {
                    const checkedUser = await prisma.users.findUnique({
                        select: {
                            id: true,
                            password: true,
                        },
                        where: {
                            email,
                        },
                    });

                    const isCorrectPassword = await bcrypt.compare(
                        plainPassword,
                        checkedUser.password
                    );

                    if (!isCorrectPassword) {
                        throw createError({
                            statusCode: 400,
                            statusMessage: "メールアドレス、またはパスワードが正しくありません",
                        });
                    }

                    const loginUser = await prisma.users.findUnique({
                        select: {
                            id: true,
                            email: true,
                        },
                        where: {
                            email,
                        },
                    });
                    return loginUser;
                } catch (e) {
                    console.error(e);
                    throw createError({
                        statusCode: 400,
                        statusMessage: "登録に失敗しました",
                    });
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            (session as any).user.id = token.id;
            return Promise.resolve(session);
        },
        async jwt({ token, account }) {
            if (account) {
                token.id = account.providerAccountId;
            }
            return token;
        },
    },
});

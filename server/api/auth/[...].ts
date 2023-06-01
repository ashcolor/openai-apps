import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/signup",
        // signOut: "/auth/logout",
        // verifyRequest: "/auth/verify-request",
    },
    providers: [
        GoogleProvider.default({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile: any) {
                // console.log("---profile---");
                // console.log("profile", profile);

                const email = profile.email;
                const name = profile.name;
                const avatarUrl = profile.picture;

                const prisma = new PrismaClient();

                const existingUser = await prisma.users.findFirst({
                    select: {
                        id: true,
                    },
                    where: {
                        email,
                    },
                });

                if (existingUser) {
                    profile.id = existingUser.id;
                } else {
                    let createdUser;
                    try {
                        createdUser = await prisma.$transaction(async (prisma) => {
                            const userId = randomUUID();

                            const user = await prisma.users.create({
                                data: {
                                    id: userId,
                                    email,
                                },
                            });

                            await prisma.profiles.create({
                                data: {
                                    id: userId,
                                    username: name,
                                    // @ts-ignore
                                    avatar_url: avatarUrl,
                                },
                            });
                            return user;
                        });
                    } catch (e) {
                        // console.error(e);
                        throw createError({
                            statusCode: 400,
                            statusMessage: "保存に失敗しました",
                        });
                    } finally {
                        prisma.$disconnect();
                    }
                    // console.log(createdUser);

                    profile.id = createdUser.id;
                }

                // jwtのuserにデータが渡される
                return profile;
            },
        }),
        CredentialsProvider.default({
            name: "Credentials",
            async authorize(credentials: Record<"username" | "password", string> | undefined) {
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
                } catch (error: any) {
                    // console.error(error);
                    throw createError({
                        statusCode: 400,
                        statusMessage: error?.message,
                    });
                }
            },
        }),
    ],
    callbacks: {
        // このコールバックは、JSON Web トークンが作成されるとき (つまり、サインイン時)、
        // または更新されるとき(つまり、クライアントでセッションがアクセスされるとき) に必ず呼び出されます。
        // 戻り値は暗号化され、Cookie に保存されます。
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        jwt({ token, account, user }) {
            // console.log("---jwt---");

            if (user) {
                token.userId = user.id;
            }
            // console.log("user", user);
            // console.log("account", account);

            // sessionにデータが渡される
            return token;
        },
        // セッションがチェックされるたびに呼び出されます。
        // デフォルトでは、セキュリティを強化するためにトークンのサブセットのみが返されます。
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        session({ session, token, user }) {
            // console.log("---session---");
            (session as any).user.id = token.id;
            return session;
        },
    },
});

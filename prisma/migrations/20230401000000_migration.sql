-- CreateTable
CREATE TABLE "public"."characters" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "avatarSrc" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chats" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "characterId" INTEGER,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "chatId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "email" TEXT,
    "username" TEXT,
    "avatar_url" TEXT,
    "website" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "public"."profiles"("username");

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

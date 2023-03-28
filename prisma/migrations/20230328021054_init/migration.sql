-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "avatarSrc" TEXT NOT NULL,
    "prompt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterId" INTEGER,
    CONSTRAINT "Chat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

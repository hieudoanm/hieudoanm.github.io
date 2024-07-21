-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "chess";

-- CreateEnum
CREATE TYPE "chess"."ChessStatus" AS ENUM ('basic', 'premium', 'staff');

-- CreateEnum
CREATE TYPE "chess"."ChessLeague" AS ENUM ('Wood', 'Stone', 'Bronze', 'Silver', 'Crystal', 'Elite', 'Champion', 'Legend');

-- CreateEnum
CREATE TYPE "chess"."ChessTitle" AS ENUM ('GM', 'WGM', 'IM', 'WIM', 'FM', 'WFM', 'CM', 'WCM', 'NM', 'WNM', 'AGM', 'AIM', 'AFM', 'ACM');

-- CreateEnum
CREATE TYPE "chess"."ChessTimeClass" AS ENUM ('daily', 'classical', 'rapid', 'blitz', 'bullet');

-- CreateEnum
CREATE TYPE "chess"."ChessResult" AS ENUM ('win', 'fiftymove', 'agreed', 'insufficient', 'repetition', 'stalemate', 'timevsinsufficient', 'checkmated', 'resigned', 'timeout', 'abandoned', 'bughousepartnerlose', 'threecheck', 'kingofthehill');

-- CreateEnum
CREATE TYPE "chess"."ChessVariant" AS ENUM ('bughouse', 'chess', 'chess960', 'crazyhouse', 'kingofthehill', 'oddschess', 'threecheck');

-- CreateEnum
CREATE TYPE "chess"."ChessPiece" AS ENUM ('king', 'queen', 'rook', 'bishop', 'knight', 'pawn');

-- CreateEnum
CREATE TYPE "chess"."ChessSide" AS ENUM ('white', 'black');

-- CreateTable
CREATE TABLE "chess"."ChessPlayer" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "followers" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL DEFAULT '',
    "countryCode" TEXT NOT NULL DEFAULT '',
    "twitchUrl" TEXT NOT NULL DEFAULT '',
    "isStreamer" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "lastOnline" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joined" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "chess"."ChessStatus" NOT NULL DEFAULT 'basic',
    "title" "chess"."ChessTitle",
    "league" "chess"."ChessLeague",
    "archives" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChessPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chess"."ChessStats" (
    "playerId" INTEGER NOT NULL,
    "timeClass" "chess"."ChessTimeClass" NOT NULL DEFAULT 'daily',
    "best" INTEGER NOT NULL DEFAULT 0,
    "last" INTEGER NOT NULL DEFAULT 0,
    "deviation" INTEGER NOT NULL DEFAULT 0,
    "win" INTEGER NOT NULL DEFAULT 0,
    "draw" INTEGER NOT NULL DEFAULT 0,
    "loss" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChessStats_pkey" PRIMARY KEY ("playerId","timeClass")
);

-- CreateTable
CREATE TABLE "chess"."ChessGame" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "pgn" TEXT NOT NULL DEFAULT '',
    "timeControl" TEXT NOT NULL DEFAULT '',
    "timeClass" "chess"."ChessTimeClass" NOT NULL DEFAULT 'daily',
    "endTime" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rated" BOOLEAN NOT NULL DEFAULT false,
    "tcn" TEXT NOT NULL DEFAULT '',
    "initialSetup" TEXT NOT NULL DEFAULT '',
    "rules" "chess"."ChessVariant" NOT NULL DEFAULT 'chess',
    "fen" TEXT NOT NULL DEFAULT '',
    "whiteAccuracy" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "blackAccuracy" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "whiteUsername" TEXT NOT NULL DEFAULT '',
    "blackUsername" TEXT NOT NULL DEFAULT '',
    "whiteResult" "chess"."ChessResult" NOT NULL DEFAULT 'checkmated',
    "blackResult" "chess"."ChessResult" NOT NULL DEFAULT 'checkmated',
    "whiteRating" INTEGER NOT NULL DEFAULT 0,
    "blackRating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChessGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chess"."ChessOpening" (
    "eco" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "pgn" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChessOpening_pkey" PRIMARY KEY ("eco","name","pgn")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChessPlayer_username_key" ON "chess"."ChessPlayer"("username");

-- AddForeignKey
ALTER TABLE "chess"."ChessStats" ADD CONSTRAINT "ChessStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "chess"."ChessPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

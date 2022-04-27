-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Climb" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grade" TEXT NOT NULL DEFAULT 'v0',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "tags" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Climb_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ENABLE', 'DISABLE');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ASSIGN_USER_TO_EVENT', 'REMOVE_ASSIGNMENT_OF_USER');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateBirth" TIMESTAMP(3) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ENABLE',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "AssignedEventToUsers" (
    "uuid" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "userUuid" TEXT NOT NULL,
    "eventUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssignedEventToUsers_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Event" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "startsOf" TIMESTAMP(3),
    "endsOf" TIMESTAMP(3),
    "tagUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Tag" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Habit" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "dayHabit" (
    "uuid" TEXT NOT NULL,
    "habitUuid" TEXT NOT NULL,
    "daysInWeekUuid" TEXT NOT NULL,

    CONSTRAINT "dayHabit_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Day" (
    "uuid" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "day" TEXT NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Notification" (
    "uuid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "NotificationType" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "NotificationsToUsers" (
    "uuid" TEXT NOT NULL,
    "isSender" BOOLEAN NOT NULL DEFAULT false,
    "notificationUuid" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationsToUsers_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dayHabit_habitUuid_daysInWeekUuid_key" ON "dayHabit"("habitUuid", "daysInWeekUuid");

-- AddForeignKey
ALTER TABLE "AssignedEventToUsers" ADD CONSTRAINT "AssignedEventToUsers_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedEventToUsers" ADD CONSTRAINT "AssignedEventToUsers_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "Event"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tagUuid_fkey" FOREIGN KEY ("tagUuid") REFERENCES "Tag"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dayHabit" ADD CONSTRAINT "dayHabit_habitUuid_fkey" FOREIGN KEY ("habitUuid") REFERENCES "Habit"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dayHabit" ADD CONSTRAINT "dayHabit_daysInWeekUuid_fkey" FOREIGN KEY ("daysInWeekUuid") REFERENCES "Day"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationsToUsers" ADD CONSTRAINT "NotificationsToUsers_notificationUuid_fkey" FOREIGN KEY ("notificationUuid") REFERENCES "Notification"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationsToUsers" ADD CONSTRAINT "NotificationsToUsers_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

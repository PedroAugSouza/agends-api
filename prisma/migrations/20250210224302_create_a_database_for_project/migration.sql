-- CreateTable
CREATE TABLE `User` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dateBirth` DATETIME(3) NOT NULL,
    `status` ENUM('ENABLE', 'DISABLE') NOT NULL DEFAULT 'ENABLE',
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssignedEventToUsers` (
    `uuid` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NOT NULL,
    `eventUuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `allDay` BOOLEAN NOT NULL DEFAULT false,
    `startsOf` DATETIME(3) NULL,
    `endsOf` DATETIME(3) NULL,
    `tagUuid` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habit` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HabitWeekDays` (
    `uuid` VARCHAR(191) NOT NULL,
    `weekDay` INTEGER NOT NULL,
    `habitUuid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HabitWeekDays_habitUuid_weekDay_key`(`habitUuid`, `weekDay`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dayHabit` (
    `uuid` VARCHAR(191) NOT NULL,
    `habitUuid` VARCHAR(191) NOT NULL,
    `daysInWeekUuid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dayHabit_habitUuid_daysInWeekUuid_key`(`habitUuid`, `daysInWeekUuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Day` (
    `uuid` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL,
    `day` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssignedEventToUsers` ADD CONSTRAINT `AssignedEventToUsers_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedEventToUsers` ADD CONSTRAINT `AssignedEventToUsers_eventUuid_fkey` FOREIGN KEY (`eventUuid`) REFERENCES `Event`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_tagUuid_fkey` FOREIGN KEY (`tagUuid`) REFERENCES `Tag`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Habit` ADD CONSTRAINT `Habit_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HabitWeekDays` ADD CONSTRAINT `HabitWeekDays_habitUuid_fkey` FOREIGN KEY (`habitUuid`) REFERENCES `Habit`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dayHabit` ADD CONSTRAINT `dayHabit_habitUuid_fkey` FOREIGN KEY (`habitUuid`) REFERENCES `Habit`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dayHabit` ADD CONSTRAINT `dayHabit_daysInWeekUuid_fkey` FOREIGN KEY (`daysInWeekUuid`) REFERENCES `Day`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

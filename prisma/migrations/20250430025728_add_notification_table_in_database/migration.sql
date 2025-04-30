-- CreateTable
CREATE TABLE `Notification` (
    `uuid` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `NotificationType` ENUM('ASSIGN_USER_TO_EVENT', 'REMOVE_ASSIGNMENT_OF_USER') NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationsToUsers` (
    `uuid` VARCHAR(191) NOT NULL,
    `isSender` BOOLEAN NOT NULL DEFAULT false,
    `notificationUuid` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NotificationsToUsers` ADD CONSTRAINT `NotificationsToUsers_notificationUuid_fkey` FOREIGN KEY (`notificationUuid`) REFERENCES `Notification`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationsToUsers` ADD CONSTRAINT `NotificationsToUsers_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

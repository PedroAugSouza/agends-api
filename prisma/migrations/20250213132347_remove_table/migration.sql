/*
  Warnings:

  - You are about to drop the `habitweekdays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `habitweekdays` DROP FOREIGN KEY `HabitWeekDays_habitUuid_fkey`;

-- DropTable
DROP TABLE `habitweekdays`;

-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_walletId_fkey`;

-- DropForeignKey
ALTER TABLE `Wallet` DROP FOREIGN KEY `Wallet_mainCardId_fkey`;

-- DropForeignKey
ALTER TABLE `WalletCategory` DROP FOREIGN KEY `WalletCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `WalletCategory` DROP FOREIGN KEY `WalletCategory_walletId_fkey`;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_mainCardId_fkey` FOREIGN KEY (`mainCardId`) REFERENCES `MainCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WalletCategory` ADD CONSTRAINT `WalletCategory_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WalletCategory` ADD CONSTRAINT `WalletCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

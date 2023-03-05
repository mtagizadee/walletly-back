import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';

// this is a module for wallets
@Module({
  providers: [WalletsService],
  controllers: [WalletsController],
})
export class WalletsModule {}

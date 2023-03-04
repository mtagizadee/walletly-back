import { Module } from '@nestjs/common';
import { LocalPrismaModule } from './local-prisma/local-prisma.module';
import { CardsModule } from './cards/cards.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [LocalPrismaModule, CardsModule, WalletsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LocalPrismaModule } from './local-prisma/local-prisma.module';
import { CardsModule } from './cards/cards.module';
import { WalletsModule } from './wallets/wallets.module';
import { CategoriesModule } from './categories/categories.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    LocalPrismaModule,
    CardsModule,
    WalletsModule,
    CategoriesModule,
    PurchasesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

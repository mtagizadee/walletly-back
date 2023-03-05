import { Module } from '@nestjs/common';
import { LocalPrismaModule } from './local-prisma/local-prisma.module';
import { CardsModule } from './cards/cards.module';
import { WalletsModule } from './wallets/wallets.module';
import { CategoriesModule } from './categories/categories.module';
import { PurchasesModule } from './purchases/purchases.module';
import { LocalFirebaseModule } from './local-firebase/local-firebase.module';

@Module({
  imports: [
    LocalPrismaModule,
    LocalFirebaseModule,
    CardsModule,
    WalletsModule,
    CategoriesModule,
    PurchasesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

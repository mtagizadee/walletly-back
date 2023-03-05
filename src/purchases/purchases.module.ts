import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { LocalFirebaseModule } from "../local-firebase/local-firebase.module";

@Module({
  providers: [PurchasesService],
  controllers: [PurchasesController],
  imports: [LocalFirebaseModule]
})
export class PurchasesModule {}

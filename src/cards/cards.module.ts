import { Module } from '@nestjs/common';
import { CardsService } from "./cards.service";

@Module({
  controllers: [],
  providers: [CardsService]
})
export class CardsModule {}

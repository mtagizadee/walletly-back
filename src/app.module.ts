import { Module } from '@nestjs/common';
import { LocalPrismaModule } from './local-prisma/local-prisma.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [LocalPrismaModule, CardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

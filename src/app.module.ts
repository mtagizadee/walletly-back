import { Module } from '@nestjs/common';
import { LocalPrismaModule } from './local-prisma/local-prisma.module';
@Module({
  imports: [LocalPrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

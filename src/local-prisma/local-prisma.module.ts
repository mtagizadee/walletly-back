import { Global, Module } from '@nestjs/common';
import { LocalPrismaService } from './local-prisma.service';

@Global()
@Module({
  providers: [LocalPrismaService],
  exports: [LocalPrismaService],
})
export class LocalPrismaModule {}

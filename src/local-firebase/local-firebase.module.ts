import { Module } from '@nestjs/common';
import { LocalFirebaseService } from './local-firebase.service';

@Module({
  providers: [LocalFirebaseService],
  exports: [LocalFirebaseService],
})
export class LocalFirebaseModule {}

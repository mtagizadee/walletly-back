import { THistoryDuration } from '../types/history-duration.type';
import { IsOptional, IsString } from 'class-validator';

export class FilterHistoryDto {
  @IsOptional()
  @IsString()
  duration?: THistoryDuration;
}

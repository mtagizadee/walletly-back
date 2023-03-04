import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsOptional()
  @IsDecimal()
  currentAmount: number;
}

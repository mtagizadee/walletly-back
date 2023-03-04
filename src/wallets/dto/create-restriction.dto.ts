import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRestrictionDto {
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsNotEmpty()
  @IsDecimal()
  limitAmount: string;
}

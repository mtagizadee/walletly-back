import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class AssignCategoryDto {
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsNotEmpty()
  @IsInt()
  walletId: number;

  @IsNotEmpty()
  @IsDecimal()
  limitAmount: string;
}

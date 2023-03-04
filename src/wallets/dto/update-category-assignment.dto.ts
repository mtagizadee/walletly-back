import { IsDecimal, IsInt, IsOptional } from 'class-validator';

export class UpdateCategoryAssignmentDto {
  @IsOptional()
  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsDecimal()
  limitAmount: string;
}

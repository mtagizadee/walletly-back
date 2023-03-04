import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaErrors } from '../common/helpers/prisma-errors';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: LocalPrismaService) {}

  /**
   * Finds all categories
   * @returns founded categories
   */
  async findAll() {
    return this.prisma.category.findMany();
  }

  /**
   * Creates a new category
   * @param createCategoryDto - data to create new category
   * @throws ConflictException - if the category already exists
   */
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      if (PrismaErrors.isPrismaError(error)) {
        if (PrismaErrors.isUniqueConstraintError(error)) {
          throw new ConflictException('Category already exists.');
        }
      }
    }
  }
}

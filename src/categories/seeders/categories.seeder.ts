import { Injectable } from '@nestjs/common';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { LocalPrismaService } from '../../local-prisma/local-prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesSeeder implements Seeder {
  constructor(private readonly prisma: LocalPrismaService) {}

  async seed(): Promise<any> {
    const categories: CreateCategoryDto[] = [
      { name: 'Food' },
      { name: 'Entertainment' },
      { name: 'Education' },
      { name: 'Transport' },
      { name: 'Sport' },
    ];

    return this.prisma.category.createMany({
      data: categories,
    });
  }

  async drop(): Promise<any> {
    return this.prisma.category.deleteMany({});
  }
}

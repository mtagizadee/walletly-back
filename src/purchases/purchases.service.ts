import { Injectable, NotFoundException } from '@nestjs/common';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaErrors } from '../common/helpers/prisma-errors';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: LocalPrismaService) {}

  async findAll() {
    return this.prisma.purchase.findMany();
  }

  /**
   * Creates a new purchase
   * @param createPurchaseDto - data to create a new purchase
   * @returns created purchase
   * @throws NotFoundException - if the category or wallet does not exist.
   */
  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      return await this.prisma.purchase.create({
        data: createPurchaseDto,
      });
    } catch (error) {
      if (PrismaErrors.isPrismaError(error)) {
        if (PrismaErrors.isForeignConstraintError(error)) {
          throw new NotFoundException('Category or wallet does not exist.');
        }
      }

      throw error;
    }
  }
}

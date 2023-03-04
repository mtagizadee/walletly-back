import { Injectable, NotFoundException } from '@nestjs/common';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaErrors } from '../common/helpers/prisma-errors';
import { addPurchase, removePurchase } from './helpers';

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
      const purchase = await this.prisma.purchase.create({
        data: createPurchaseDto,
        include: {
          wallet: {
            include: {
              mainCard: true,
              walletCategories: {
                where: {
                  categoryId: createPurchaseDto.categoryId,
                },
              },
            },
          },
        },
      });

      await this.prisma.mainCard.update({
        where: { id: purchase.wallet.mainCard.id },
        data: {
          currentAmount: removePurchase(
            purchase.wallet.mainCard.currentAmount,
            purchase.amount,
          ),
        },
      });

      // if there was a assignment between wallet and category then add the purchase amount
      // to the current spent amount
      if (purchase.wallet.walletCategories.length) {
        const walletCategory = purchase.wallet.walletCategories[0];
        await this.prisma.walletCategory.update({
          where: { id: walletCategory.id },
          data: {
            currentSpentAmount: addPurchase(
              walletCategory.currentSpentAmount,
              createPurchaseDto.amount as any,
            ),
          },
        });
      }
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

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PrismaErrors } from '../common/helpers/prisma-errors';
import { AssignCategoryDto } from './dto/assign-category.dto';
import { FilterHistoryDto } from './dto/filter-history.dto';
import { THistoryDuration } from './types/history-duration.type';
import { durationType2Date } from './helpers';
import { LIMIT_RATE } from './constants';
import { getMessaging } from 'firebase/messaging';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: LocalPrismaService) {}

  /**
   * Finds all wallets
   * @returns founded wallets
   */
  async findAll() {
    return this.prisma.wallet.findMany();
  }

  /**
   * Finds a wallet by its id
   * @param id - id of the wallet that is asked to find
   * @param filterHistoryDto - data to filter the history of purchases
   * @returns founded wallet
   * @throws NotFoundException - if the wallet was not found
   */
  async findOne(id: number, filterHistoryDto: FilterHistoryDto) {
    const duration: THistoryDuration = filterHistoryDto.duration ?? 'lw';
    const minDate = durationType2Date(duration);

    const wallet = await this.prisma.wallet.findUnique({
      where: { id },
      include: {
        walletCategories: {
          select: {
            id: true,
            limitAmount: true,
            currentSpentAmount: true,
            category: true,
          },
        },
        purchases: {
          where: {
            createdAt: { gte: minDate },
          },
          include: { category: true },
        },
      },
    });

    if (!wallet) throw new NotFoundException('Wallet is not found.');
    const { purchases, ...rest } = wallet;
    return { ...rest, history: purchases };
  }

  /**
   * Creates a new wallet
   * @param createWalletDto - data to create new wallet
   * @returns newly created wallet
   * @throws ConflictException - if the wallet already exists
   * @throws NotFoundException - if the provided card does not exist
   */
  async create(createWalletDto: CreateWalletDto) {
    try {
      const wallet = await this.prisma.wallet.create({
        data: createWalletDto,
      });

      const categories = await this.prisma.category.findMany();
      await Promise.all(
        categories.map((category) =>
          this.assignCategory({
            categoryId: category.id,
            walletId: wallet.id,
            limitAmount: '0',
          }),
        ),
      );

      return wallet;
    } catch (error) {
      if (PrismaErrors.isPrismaError(error)) {
        if (PrismaErrors.isUniqueConstraintError(error)) {
          throw new ConflictException('Wallet already exists');
        }

        if (PrismaErrors.isForeignConstraintError(error)) {
          throw new NotFoundException('The card does not exist.');
        }
      }

      throw error;
    }
  }

  /**
   * Assigns a category to a wallet
   * @param assignCategoryDto - data to assign the category to the wallet
   * @returns created assignment
   * @throws NotFoundException
   */
  async assignCategory(assignCategoryDto: AssignCategoryDto) {
    try {
      return await this.prisma.walletCategory.create({
        data: assignCategoryDto,
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

  /**
   * Updates assigned category
   * @param id - id of the assignment that needs to be changed
   * @param updateCategoryAssignment - data to update the assignment
   * @returns updated assignment
   * @throws NotFoundException - if the assignment was not found
   * @throws BadRequestException - if the category to update does not exist
   */
  async updateCategoryAssignment(id: number, updateCategoryAssignment) {
    try {
      return await this.prisma.walletCategory.update({
        where: { id },
        data: updateCategoryAssignment,
      });
    } catch (error) {
      if (PrismaErrors.isPrismaError(error)) {
        if (PrismaErrors.isNotFoundError(error)) {
          throw new NotFoundException('Assignment was not found.');
        }

        if (PrismaErrors.isForeignConstraintError(error)) {
          throw new BadRequestException('Category does not exist.');
        }
      }

      throw error;
    }
  }

  /**
   * Deletes a category assignment
   * @param id - id of the assignment to delete
   * @returns deleted assignment
   * @throws NotFoundException - if the assignment was not found
   */
  async deleteCategoryAssignment(id: number) {
    try {
      return await this.prisma.walletCategory.delete({
        where: { id },
      });
    } catch (error) {
      if (PrismaErrors.isPrismaError(error)) {
        if (PrismaErrors.isNotFoundError(error)) {
          throw new NotFoundException('Assignment was not found.');
        }
      }

      throw error;
    }
  }

  /**
   * Finds all the assignments that are close to the limit
   * @returns founded assignments
   */
  async findCloseLimits() {
    const assignments = await this.prisma.walletCategory.findMany({
      include: {
        wallet: true,
        category: true,
      },
    });

    return assignments.filter(
      (assignment) =>
        Number(assignment.limitAmount) * LIMIT_RATE <=
        Number(assignment.currentSpentAmount),
    );
  }
}

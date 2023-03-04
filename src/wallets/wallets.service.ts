import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PrismaErrors } from '../common/helpers/prisma-errors';

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
   * @returns founded wallet
   * @throws NotFoundException - if the wallet was not found
   */
  async findOne(id: number) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id },
      include: {
        walletCategories: {
          select: {
            limitAmount: true,
            category: true,
          },
        },
        purchases: {
          include: {
            category: true,
          },
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
      return await this.prisma.wallet.create({
        data: createWalletDto,
      });
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
}

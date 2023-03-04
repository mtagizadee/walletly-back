import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaErrors } from '../common/helpers/prisma-errors';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: LocalPrismaService) {}

  /**
   * Finds all cards
   * @returns founded cards
   */
  async findAll() {
    return this.prisma.mainCard.findMany();
  }

  /**
   * Finds a card by id with its wallets
   * @param id - id of the card that is asked
   * @returns founded card
   * @throws NotFoundException - if the card was not found
   */
  async findOne(id: number) {
    const card = await this.prisma.mainCard.findUnique({
      where: { id },
      include: {
        wallets: {
          include: {
            purchases: {
              select: {
                id: true,
                createdAt: true,
                amount: true,
                wallet: true,
                category: true,
              },
            },
          },
        },
      },
    });

    if (!card) throw new NotFoundException('The card was not found!');

    // combine the purchases each of the cards into one history field for the whole card
    const history = card.wallets.reduce((purchases, wallet) => {
      return purchases.concat(wallet.purchases);
    }, []);

    // delete the purchases from each wallet
    card.wallets.map((wallet) => delete wallet.purchases);
    return { ...card, history };
  }

  /**
   * Creates a new card
   * @param createCardDto - data for the creation of the card
   * @returns created card
   * @throws ConflictException - if the card already exists
   */
  async create(createCardDto: CreateCardDto) {
    try {
      return await this.prisma.mainCard.create({
        data: createCardDto,
      });
    } catch (error) {
      if (PrismaErrors.isPrismaError(error)) {
        if (PrismaErrors.isUniqueConstraintError(error)) {
          throw new ConflictException('Card already exists.');
        }
      }

      throw error;
    }
  }
}

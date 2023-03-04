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
        wallets: true,
      },
    });

    if (!card) throw new NotFoundException('The card was not found!');
    return card;
  }

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

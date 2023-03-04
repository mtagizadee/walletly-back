import { Injectable } from '@nestjs/common';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: LocalPrismaService) {}

  async findAll() {
    return this.prisma.mainCard.findMany();
  }

  async findOne(id: number) {
    try {
    } catch (error) {}
  }
}

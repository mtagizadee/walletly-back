import { Prisma } from '@prisma/client';

export class PrismaErrors {
  static isPrismaError(error) {
    return error instanceof Prisma.PrismaClientKnownRequestError;
  }

  static isNotFoundError(error) {
    return error.code === 'P2025';
  }

  static isUniqueConstraintError(error) {
    return error.code === 'P2002';
  }
}

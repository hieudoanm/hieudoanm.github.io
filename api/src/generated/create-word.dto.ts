import { Prisma } from '@prisma/client';

export class CreateWordDto {
  word: string;
  results?: Prisma.InputJsonValue;
  syllables?: Prisma.InputJsonValue;
  pronunciation?: Prisma.InputJsonValue;
  frequency?: number;
}

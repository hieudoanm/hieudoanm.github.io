import { Prisma } from '@hieudoanm/generated/prisma/public/client';

export class CreateWordDto {
  word: string;
  results?: Prisma.InputJsonValue;
  syllables?: Prisma.InputJsonValue;
  pronunciation?: Prisma.InputJsonValue;
  frequency?: number;
  createdAt?: Date;
}

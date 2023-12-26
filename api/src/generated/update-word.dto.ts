import { Prisma } from '@prisma/client';

export class UpdateWordDto {
  results?: Prisma.InputJsonValue;
  syllables?: Prisma.InputJsonValue;
  pronunciation?: Prisma.InputJsonValue;
  frequency?: number;
}

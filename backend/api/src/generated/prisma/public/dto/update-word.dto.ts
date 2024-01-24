import { Prisma } from '@hieudoanm/generated/prisma/chess/client';

export class UpdateWordDto {
  results?: Prisma.InputJsonValue;
  syllables?: Prisma.InputJsonValue;
  pronunciation?: Prisma.InputJsonValue;
  frequency?: number;
  createdAt?: Date;
}

import { Prisma } from '@hieudoanm/generated/prisma/public/client';

export class UpdateWordDto {
  results?: Prisma.InputJsonValue;
  syllables?: Prisma.InputJsonValue;
  pronunciation?: Prisma.InputJsonValue;
  frequency?: number;
  createdAt?: Date;
}

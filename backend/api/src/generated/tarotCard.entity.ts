import { TarotCardType } from '@prisma/client';

export class TarotCardDto {
  type: TarotCardType;
  id: string;
  name: string | null;
  value: string | null;
  valueInt: number | null;
  suit: string | null;
  meaningUp: string | null;
  meaningReverse: string | null;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

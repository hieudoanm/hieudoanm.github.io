
import {Prisma} from '@prisma/client'


export class WordDto {
  word: string ;
results: Prisma.JsonValue  | null;
syllables: Prisma.JsonValue  | null;
pronunciation: Prisma.JsonValue  | null;
frequency: number  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
}

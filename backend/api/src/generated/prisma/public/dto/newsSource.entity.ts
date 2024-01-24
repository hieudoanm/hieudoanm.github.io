import { NewsSourceCategory } from '@hieudoanm/generated/prisma/public/client';

export class NewsSourceDto {
  id: string;
  name: string;
  description: string;
  url: string;
  category: NewsSourceCategory;
  language: string;
  country: string;
}

export class CreateQuoteDto {
  id: string;
  author?: string;
  authorSlug?: string;
  content?: string;
  createdAt?: Date;
}

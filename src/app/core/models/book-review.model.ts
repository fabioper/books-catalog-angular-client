export class BookReviewModel {
  score?: number;
  comment?: string;
  bookId?: number;
  user?: { guid: string, name: string };
}

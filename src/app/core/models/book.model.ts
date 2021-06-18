import { GenreModel } from "./genre.model";
import { PublisherModel } from "./publisher.model";
import { AuthorModel } from "./author.model";

export class BookModel {
  id!: number;
  description!: string;
  genres!: GenreModel[];
  isbn!: string;
  publishers!: PublisherModel[];
  releaseDate!: Date;
  title!: string;
  coverUri?: string;
  authors!: AuthorModel[];
}

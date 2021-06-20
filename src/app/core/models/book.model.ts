import { GenreModel } from "./genre.model";
import { PublisherModel } from "./publisher.model";
import { AuthorModel } from "./author.model";

export class BookModel {
  id!: number;
  description!: string;
  isbn!: string;
  releaseDate!: Date;
  title!: string;
  coverUri?: string;
  imageFile?: File;

  authors!: AuthorModel[];
  authorIds!: number[];

  genres!: GenreModel[];
  genreIds?: number[];

  publishers!: PublisherModel[];
  publisherIds?: number[];

  constructor(props?: Partial<BookModel>) {
    if (props) {
      Object.assign(this, props)
    }
  }
}

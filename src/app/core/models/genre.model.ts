export class GenreModel {
  id?: number;
  name?: string;

  constructor(props?: Partial<GenreModel>) {
    if (props) {
      Object.assign(this, props);
    }
  }
}

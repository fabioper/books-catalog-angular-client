export class PublisherModel {
  id?: number;
  name?: string;

  constructor(props?: Partial<PublisherModel>) {
    if (props) {
      Object.assign(this, props);
    }
  }
}

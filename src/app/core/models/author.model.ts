export class AuthorModel {
  id!: number;
  firstName!: string;
  lastName!: string;
  biography!: string;
  birthDate!: Date | string;
  imageUri?: string;
  imageFile?: File;

  constructor(params?: Partial<AuthorModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}

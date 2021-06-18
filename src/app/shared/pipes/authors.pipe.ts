import { Pipe, PipeTransform } from '@angular/core';
import { AuthorModel } from "../../core/models/author.model";

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {

  transform(authors: AuthorModel[] | undefined, ...args: unknown[]): unknown {
    const authorNames = authors?.map(author => `${ author.firstName } ${ author.lastName }`);
    return authorNames?.join(', ');
  }

}

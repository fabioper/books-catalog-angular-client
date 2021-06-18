import { Pipe, PipeTransform } from '@angular/core';
import { GenreModel } from "../../core/models/genre.model";

@Pipe({
  name: 'genres'
})
export class GenresPipe implements PipeTransform {

  transform(value: GenreModel[] | undefined, ...args: unknown[]): unknown {
    return value?.map(genre => genre.name).join(', ');
  }

}

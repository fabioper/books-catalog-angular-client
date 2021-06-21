import { Pipe, PipeTransform } from '@angular/core';
import { PublisherModel } from "../../core/models/publisher.model";

@Pipe({
  name: 'publishers'
})
export class PublishersPipe implements PipeTransform {

  transform(value: PublisherModel[] | undefined, ...args: unknown[]): unknown {
    return value?.map(p => p.name).join(', ');
  }

}

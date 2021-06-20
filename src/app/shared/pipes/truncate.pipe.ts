import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 25, ellipsis = '...'): unknown {
    return value.substr(0, limit) + ellipsis;
  }

}

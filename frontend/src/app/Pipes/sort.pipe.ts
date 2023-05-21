import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<string>, args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    }
    );

    return value;
  }

  // transform(array: any, field: string): any[] {
  //   if (!Array.isArray(array)) {
  //     return array;
  //   }
  //   array.sort((a: any, b: any) => {
  //     if (a[field] < b[field]) {
  //       return -1;
  //     } else if (a[field] > b[field]) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   return array;
  // }
}

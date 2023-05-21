import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],filterString:string,propName:string): any[] {
    let resultArray=[];
    if(!value|| filterString===''|| propName===''){
      return value;
    }
    for (const item of value) {
      // console.log('item[propName]',item[propName],item,filterString,propName)
      if(item[propName]===filterString){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}

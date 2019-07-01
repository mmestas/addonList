import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter2'
})
export class CustomFilter2Pipe implements PipeTransform {
  transform(list: any, args?: any): any {
    if(list) {
      let newList = [];
      list.forEach(obj => {
        if(!obj.columns) {
          newList.push(obj);
        }
      })
      return newList;
    }

  }

}

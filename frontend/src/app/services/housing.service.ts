import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {} from 'rxjs';
import { IProperty } from '../property/iproperty';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllProperties(sellRent:number):Observable<IProperty[]>{
   return this.http.get('data/properties.json').pipe(
    map((data)=>{
      const propertiesArray:Array<IProperty>=[];
      for (const key in data) {
        console.log('key',key,data)
        if(data[key].SellRent==sellRent){
          propertiesArray.push(data[key])
        }

      }

      return propertiesArray;
    })
   )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {} from 'rxjs';
import { IProperty } from '../model/iproperty';
import { Observable,map } from 'rxjs';
import { Property } from '../model/property';

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

  addProperty(property:Property){
    localStorage.setItem('newProp',JSON.stringify(property));
  }

  newPropId(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String( +localStorage.getItem('PID')+1 ) )

      return localStorage.getItem('PID');
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }
}

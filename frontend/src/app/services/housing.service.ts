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

  getAllCities():Observable<string[]>{
    return this.http.get<string[]>('http://localhost:21360/api/City');
  }


  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        // console.log(propertiesArray);
        // console.log('getProperty',propertiesArray.find(p => p.Id === id))
        return propertiesArray.find(p => p.Id === id);
      })
    );
  }


  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<Property> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp'));

      if (localProperties) {
        for (const id in localProperties) {
          if (SellRent) {
          if ( localProperties[id].SellRent === SellRent) {
            propertiesArray.push(localProperties[id]);
          }
        } else {
          propertiesArray.push(localProperties[id]);
        }
        }
      }

      for (const id in data) {
        if (SellRent) {
          if ( data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
          } else {
            propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
      })
    );

    // return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property:Property){
    let propList=[property];
    if(localStorage.getItem('newProp')){
      propList=[property,...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp',JSON.stringify(propList));
  }

  newPropId(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String( +localStorage.getItem('PID')+1 ) )

      return +localStorage.getItem('PID');
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }
}

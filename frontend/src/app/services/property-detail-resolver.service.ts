import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Property } from '../model/property';
import { Observable, catchError, of } from 'rxjs';
import { HousingService } from './housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

  constructor(private housingService:HousingService,private router:Router) { }
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> {
  //   const propId=route.params['id'];
  //   const prop=this.housingService.getProperty(+propId);
  //   console.log('prop',prop)
  //   return prop;
  // }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Property>|Property {
      const propId = route.params['id'];
        return this.housingService.getProperty(+propId).pipe(
          catchError(error=>{
            console.log('error',error)
            this.router.navigate(['/']);
            return of(null);
          })
        )
      }
}

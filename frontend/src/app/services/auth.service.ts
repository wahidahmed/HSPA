import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl=environment.baseUrl;

  constructor() { }

  authUser(user:any){
    let userArray=[];
    if(localStorage.getItem('Users')){
      userArray=JSON.parse(localStorage.getItem('Users'));
    }
    console.log(userArray);
    return userArray.find(p=>p.userName===user.userName && p.password===user.password);
  }


}

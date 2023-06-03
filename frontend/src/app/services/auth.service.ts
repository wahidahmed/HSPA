import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IUserForLogin, IUserRegister } from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  authUser(user:IUserForLogin){

    return this.http.post(`${this.baseUrl}/account/login`,user)
    // let userArray=[];
    // if(localStorage.getItem('Users')){
    //   userArray=JSON.parse(localStorage.getItem('Users'));
    // }
    // console.log(userArray);
    // return userArray.find(p=>p.userName===user.userName && p.password===user.password);
  }


  registrUser(user:IUserRegister){
    return this.http.post(this.baseUrl+'/account/register',user)
  }


}

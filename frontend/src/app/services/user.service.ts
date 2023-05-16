import { Injectable } from '@angular/core';
import { IUser } from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user:IUser){
    let users=[];
    if(localStorage.getItem('Users')){
      users=JSON.parse(localStorage.getItem('Users'));
      users=[...users,user];
    }
    else{
      users=[user];
    }
    localStorage.setItem('Users',JSON.stringify(users) );
  }
}

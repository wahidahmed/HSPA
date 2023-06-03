import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser: string;
  constructor(private alertify:AlertifyService,private routr:Router) { }

  ngOnInit(): void {
  }
loggedIn(){
  this.loggedinUser= localStorage.getItem('username');
  return this.loggedinUser;
}

onLogout(){
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  this.alertify.success('you are logged out');
  this.routr.navigate(['user/login']);
}


}

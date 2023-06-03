import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserForLogin } from 'src/app/model/iuser';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isSubmitted:boolean=false;
  constructor(private authService:AuthService,
    private alertify:AlertifyService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  onLogin(loginForm){
    this.isSubmitted=true;
    if(loginForm.valid){
      console.log(loginForm.value);
     this.authService.authUser(loginForm.value).subscribe((res)=>{
      console.log(res);
      localStorage.setItem('token',res['token']);
      localStorage.setItem('username',res['username']);
          this.alertify.success('login success');
       this.router.navigate(['/'])
     }
     );
    // if(token){
    //    this.alertify.success('login success');
    //    this.router.navigate(['/'])
    //   }
    //   else{
    //     this.alertify.error('login failed');
    //   }
      this.isSubmitted=false;
      loginForm.resetForm();
    }
  }


}

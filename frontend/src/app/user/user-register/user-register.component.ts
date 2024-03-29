import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, IUserRegister } from 'src/app/model/iuser';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm:FormGroup;
  user:IUser;
  isSubmitted:boolean=false;
  constructor(private fb:FormBuilder,private userService:UserService,
    private alertify:AlertifyService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    // this.registrationForm=new FormGroup(
    //   {
    //     userName:new FormControl('',Validators.required),
    //     email:new FormControl(null,[Validators.required,Validators.email]),
    //     password:new FormControl(null,[Validators.required,Validators.minLength(8)]),
    //     confirmPassword:new FormControl(null,[Validators.required]),
    //     mobile:new FormControl(null,[Validators.required,Validators.minLength(11)])
    //   },
    //   this.passwordMatchingValidators
    // )

    this.createRegistrationForm();

  }

  createRegistrationForm(){
    this.registrationForm=this.fb.group({
      userName:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(6)]],
      confirmPassword:[null,[Validators.required]],
      mobile:[null,[Validators.required,Validators.minLength(2)]]
    },{validators:this.passwordMatchingValidators})
  }

  passwordMatchingValidators(fg:FormGroup):Validators{
    return fg.get('password').value===fg.get('confirmPassword').value?null:{notMatch:true};
  }

  get fcUserName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get fcEmail(){
    return this.registrationForm.get('email') as FormControl;
  }

  get fcPassword(){
    return this.registrationForm.get('password') as FormControl;
  }

  get fcConfirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get fcMobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }

  onSubmit(){
    console.log(this.registrationForm);
    this.isSubmitted=true;
    if(this.registrationForm.valid){
      // Object.assign(this.user,this.registrationForm.value);
      // this.userService.addUser(this.userData());
      this.authService.registrUser(this.userData()).subscribe(()=>{
        this.registrationForm.reset();
        this.isSubmitted=false;
        this.alertify.success('success');
      }

      )

    }
    else{
      this.alertify.error('form is not valid');
    }

  }

userData():IUserRegister{
  return this.user={
    userName:this.fcUserName.value,
    email:this.fcEmail.value,
    password:this.fcPassword.value,
    mobile:this.fcMobile.value
  }
}

}

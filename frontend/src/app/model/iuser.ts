export interface IUser {
userName:string,
email:string,
password:string,
mobile:string
}


export interface IUserForLogin {
  userName:string,
  password:string,
  token?:string
  }

  export interface IUserRegister {
    userName:string,
    email?:string,
    password:string,
    mobile?:string
    }


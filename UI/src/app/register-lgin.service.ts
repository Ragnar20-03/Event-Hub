import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterLginService {

  constructor(private hobj : HttpClient) { }

  isLoggedin()
  {
    return !! localStorage.getItem("token")
  }
  
  loggedOutUser()
  {
    localStorage.removeItem("token")
    alert("Logout Succesfully")
    
  }

  getToken()
  {
    return localStorage.getItem("token")
  }

  Login(loginData : any)
  {
    return this.hobj.post<any>("http://localhost:5100/api/login" , loginData)
  }

  Register(registerData : any)
  {
    return this.hobj.post<any>("http://localhost:5100/api/register" , registerData)
  }
}

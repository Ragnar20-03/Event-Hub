import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _rurl = "http://localhost:5100/api/register"
  private _lurl = "http://localhost:5100/api/login"

  constructor( public router : Router , public hobj : HttpClient) { }
  

  Register(registerData : any)
  {
    return this.hobj.post<any>(  this._rurl , registerData)
  }
  
  Login(registerData : any)
  {
    return this.hobj.post<any>(  this._lurl , registerData)
  }

  isLoggedin()
  {
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  

  getToken()
  {
    return localStorage.getItem('token')
  }

}

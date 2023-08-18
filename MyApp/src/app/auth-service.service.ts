import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _rurl = "http://localhost:5100/api/register"
  private _lurl = "http://localhost:5100/api/login"

  constructor(public hobj : HttpClient) { }
  

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

  getToken()
  {
    return localStorage.getItem('token')
  }

}

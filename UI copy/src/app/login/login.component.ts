import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegisterLginService } from '../register-lgin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username:"",
    password :""
  }

  constructor(private lobj : RegisterLginService , public router : Router) {}

  onLogin()
  {
    console.log(this.loginData);
    this.lobj.Login(this.loginData).subscribe({
      next :  res =>{
        console.log(res)
        localStorage.setItem("token" , res.token)
        this.router.navigate(['/special'])
      } , 
      error : err => console.log(err)
    })
  }
}

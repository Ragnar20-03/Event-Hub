import { Component } from '@angular/core';
import { RegisterLginService } from '../register-lgin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = {
    username : "" , 
    password : "" , 
    lname : "",
    fname : "",
    pn:"",

  }

  constructor(private robj : RegisterLginService , public router : Router){}

  onRegister()
  {
    console.log(this.registerData);
    this.robj.Register(this.registerData).subscribe({
      next : res => {
        console.log(res.token);
        localStorage.setItem("token" , res.token)
        this.router.navigate(['/special'])
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }
}

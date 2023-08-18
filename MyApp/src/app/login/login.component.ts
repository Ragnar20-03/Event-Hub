import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: any =
    {
      username: "",
      password: ""
    }


  constructor(public router: Router, public aobj: AuthServiceService) {

  }

  onLogin() {
    console.log(this.loginData);
    this.aobj.Login(this.loginData).subscribe({
      next: res => {
        // console.log(res . msg)
        // console.log(res . token)
        localStorage.setItem("token" , res.token )
        if (res) { alert("Loign Success") }
        this.router.navigate(['/special'])
      },
      error: err => {
        if (err.status == 403) {
          alert("Password Incorrect")
        }
        else if (err.status == 404) {
          alert("Account Not Found , please register")
          this.router.navigate(['/register'])
        }
      },

    }

    )
  }
}

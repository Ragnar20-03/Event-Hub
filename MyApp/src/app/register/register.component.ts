import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData: any =
    {
      username: "",
      password: ""
    }


  constructor(public router: Router, public aobj: AuthServiceService) {

  }

  onRegister() {
    // console.log(this.registerData);  
    this.aobj.Register(this.registerData).subscribe({
      next: (res : any) =>{
        localStorage.setItem( "token" , res.token)
        this.router.navigate(['/special'])
      },
      error: err => {
        if (err.status == 403) {
          alert("Already acoount with this id , please login !")
          this.router.navigate(['/login'])
        }
      },

    }

    )
  }

}

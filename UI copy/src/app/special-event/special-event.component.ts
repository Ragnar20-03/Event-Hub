import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {

  specialEvents : any = []

  constructor(private eobj : EventsService , public router : Router){}



  ngOnInit()
  {
    this.eobj.getSpecialEvents().subscribe({
      next:res => this.specialEvents = res , 
      error : err => {
        if (err instanceof HttpErrorResponse )
        {
          if (err.status == 400)
          { 
            alert("Please Register or Login for accessing this page")
            this.router.navigate(['/login'])
          }
        }
      }
      
    })
  }
}

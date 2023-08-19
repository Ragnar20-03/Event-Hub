import { Component, OnInit } from '@angular/core';
import { GetEventsService } from '../get-events.service';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
GetEventsService

@Component({
  selector: 'app-speicalevents',
  templateUrl: './speicalevents.component.html',
  styleUrls: ['./speicalevents.component.css']
})
export class SpeicaleventsComponent implements OnInit {

  events: any = []

  constructor( public aobj:AuthServiceService ,  public router : Router ,  public eobj: GetEventsService) { }

  ngOnInit() {
    this.eobj.getSpeicalEvents().subscribe({
      next: res => {
        this.events = res
      },
      error: err => {
        if (err instanceof HttpResponse || err.status == 401 || err.status == 500) {
          if (err.status == 401 || err.status == 500)
          {
            alert ("Authantication Failed ! , please login !" )
            this.router.navigate(['/login'])
          }
        }
      }
    })
  }
}

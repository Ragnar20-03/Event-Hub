import { Component, OnInit } from '@angular/core';
import { GetEventsService } from '../get-events.service';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
GetEventsService

@Component({
  selector: 'app-speicalevents',
  templateUrl: './speicalevents.component.html',
  styleUrls: ['./speicalevents.component.css']
})
export class SpeicaleventsComponent implements OnInit {

  events: any = []

  constructor(public eobj: GetEventsService) { }

  ngOnInit() {
    this.eobj.getSpeicalEvents().subscribe({
      next: res => this.events = res,
      error: err => {
        if (err instanceof HttpResponse || err.status == 401) {
          if (err.status == 401)
          {
            alert ("Authantication Failed ! , please login !" )
          }
        }
      }
    })
  }
}

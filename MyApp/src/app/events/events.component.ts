import { Component, OnInit } from '@angular/core';
import { GetEventsService } from '../get-events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any = []

  constructor(public eobj: GetEventsService) { }

  ngOnInit() {
    this.eobj.getEvents().subscribe({
      next : res => this.events = res , 
      error : err => {if (err) { console.log(err);
      }}
    })
  }

}

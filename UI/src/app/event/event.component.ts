import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{

  events:any = []

  constructor(private eobj : EventsService){}

  ngOnInit ()
  {
    this.eobj.getEvents().subscribe({
      next : res => {
        console.log(res);
        this.events = res ; 
        
      } , 
      error : err =>{
        console.log(err);
        
      }

    })
  }
}

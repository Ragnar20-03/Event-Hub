import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private hobj : HttpClient) { }

  getEvents()
  { 
    return this.hobj.get("http://localhost:5100/api/events")
  }

  getSpecialEvents()
    {
      return this.hobj.get("http://localhost:5100/api/specialEvents")
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEventsService {

  constructor(public hobj : HttpClient) { }

  private _url = "http://localhost:5100/api/events"
  private _surl = "http://localhost:5100/api/specialevents"

  getEvents ( ) {
    return this.hobj.get<any>(this._url)
  }
  getSpeicalEvents() {
    return this.hobj.get<any>(this._surl)

  }
}

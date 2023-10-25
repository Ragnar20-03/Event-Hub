import { Component } from '@angular/core';
import { RegisterLginService } from './register-lgin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';

  constructor(public robj : RegisterLginService){}
}

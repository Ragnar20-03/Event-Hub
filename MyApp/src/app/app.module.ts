import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { SpeicaleventsComponent } from './speicalevents/speicalevents.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { GetEventsService } from './get-events.service';
import { HttpInterceptor , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { TokenInterceptorService } from './token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    SpeicaleventsComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule , 
    FormsModule
  ],
  providers: [ GetEventsService , AuthServiceService , {
    provide : HTTP_INTERCEPTORS  , 
    useClass : TokenInterceptorService , 
    multi : true
  }],
  bootstrap: [AppComponent ]
})
export class AppModule { }

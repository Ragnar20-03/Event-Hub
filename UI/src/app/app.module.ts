import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { registerLocaleData } from '@angular/common';
import { RegisterLginService } from './register-lgin.service';
import { EventsService } from './events.service';
import { myGuardGuard } from './my-guard.guard';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent , 
    EventComponent , 
    LoginComponent , 
    RegisterComponent , 
    SpecialEventComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatAutocompleteModule , 
    FormsModule , 
    HttpClientModule , 

  ],
  providers: [RegisterLginService , EventsService ,
     {
      provide : HTTP_INTERCEPTORS  , 
      useClass : TokenInterceptorService , 
      multi : true
    } ]
      ,
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpeicaleventsComponent } from './speicalevents/speicalevents.component';
import { LoginComponent } from './login/login.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { myGuardGuard } from './my-guard.guard';

const routes: Routes = [

  {
    path : " " , component : EventsComponent
  },

{
  path : "events" , component : EventsComponent
},
{
  path : "special" , component : SpeicaleventsComponent , canActivate: [myGuardGuard]
} , 
{
  path : "login" , component : LoginComponent
} ,   
{
  path : "register" , component : RegisterComponent
}  , 
{
  path : "**" , component : NotFoundComponent
}] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

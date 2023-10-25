import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { EventComponent } from './event/event.component';
import { SpecialEventComponent } from './special-event/special-event.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { myGuardGuard } from './my-guard.guard';

const routes: Routes = [
  {
    path:"events" , component:EventComponent 
  },{
    path:"special" , component:SpecialEventComponent, canActivate: [myGuardGuard]
  },{
    path:"register" , component:RegisterComponent
  },{
    path:"login" , component:LoginComponent
  },
  {
    path:"**" , component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

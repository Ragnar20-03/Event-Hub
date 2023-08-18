import { CanActivateFn } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

export const myGuardGuard: CanActivateFn = (route, state) => {

    const aobj = inject(AuthServiceService)

    if (aobj.isLoggedin())
    {
      return true;
    }
    else 
    {
      alert("You don't have access to this ! please Suscribe")
      return false
    }

};

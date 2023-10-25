import { publishFacade } from '@angular/compiler';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RegisterLginService } from './register-lgin.service';

export const myGuardGuard: CanActivateFn = (route, state) => {

  const aobj = inject(RegisterLginService)

  if (aobj.isLoggedin())
  {
    return true;
  }
  else 
  {
    alert("You dont have accces to this page")
    return false;
  }
};

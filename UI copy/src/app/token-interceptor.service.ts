import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable  , Inject, Injector} from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterLginService } from './register-lgin.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector : Injector){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let gobj = this.injector.get(RegisterLginService)
    let myTokenizedReq = req.clone({
      setHeaders : {
        myAuthorizhation :  `Roshan ${gobj.getToken()}`
      }
    })

    return next.handle(myTokenizedReq)
  }
}

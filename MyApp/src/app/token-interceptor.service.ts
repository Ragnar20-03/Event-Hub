import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor() { }

  private aobj = inject(AuthServiceService) ; 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let tokenizedReq = req . clone ({
        setHeaders : {
          Authorization : `Bearer ${this.aobj.getToken()}`,
          name: "Roshan "
        }
      })

      return next.handle(tokenizedReq)
  }
}

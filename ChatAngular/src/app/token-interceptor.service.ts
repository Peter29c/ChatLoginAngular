import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  intercept(req, next) {
    // ASIGNAR A LA VARIABLE EL SERVICIO AUTHSERVICE
    let authService = this.injector.get(AuthService);
    // AL INTERCEPTAR LA PETICIÓN CLONA EL TOKEN DE LOCALSTORAGE Y LO ASIGNA A LA VARIABLE
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}

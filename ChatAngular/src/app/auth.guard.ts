import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): boolean {
    if (this.authService.logeado()) { // SI EL USUARIO ESTÁ LOGUEADO REGRESA TRUE
      return true;
    }
    else { // SI NO EXISTE EL TOKEN EN LOCALSTORAGE REDIRECCIONA
      this.router.navigate(['/login']);
      return false;
    }
  }
}

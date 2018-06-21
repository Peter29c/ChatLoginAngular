import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://localhost:9000/api/register";
  private loginUrl = "http://localhost:9000/api/login";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // PETICIÓN AL SERVIDOR PARA REGISTRAR
  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  // PETICIÓN AL SERVIDOR PARA INICIAR SESIÓN
  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  // SI EXISTE EL TOKEN REGRESA TRUE, SINO REGRESA FALSE
  logeado() {
    return !!localStorage.getItem('token');
  }

  // ELIMINAR LOS OBJETOS DEL LOCALSTORAGE AL SALIR
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

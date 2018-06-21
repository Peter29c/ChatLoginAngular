import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // MANDAR LOS DATOS DEL FORMULARIO AL SERVIDOR
  loginUser(){
    this.auth.loginUser(this.loginUserData).subscribe(
      res => { // REGRESA EL EMAIL Y EL TOKEN
        // console.log(res);
        // SI LOS DATOS ESTÁN CORRECTOS, REDIRECCIONA AL CHAT
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        this.router.navigate(['/chat']);
      },
      err => {
        // console.log(err)
        alert(err.error);
      }
    );
    // console.log(this.loginUserData);
  }

}

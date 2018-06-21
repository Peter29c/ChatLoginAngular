import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:9000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  // MANDAR EL MENSAJE Y EL USUARIO AL SERVIDOR
  sendMessage(message) {
    let email = localStorage.getItem('email');
    this.socket.emit('new message', {message: message, email: email});
  }

  // MANDAR EL USUARIO AL SERVIDOR
  sendUser(user) {
    this.socket.emit('new user', (user));
  }

  // RECIBIR LOS NUEVOS MENSAJES DEL SERVIDOR
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('new message', (message) => {
          observer.next(message);
      });
    });
    return observable;
  }

  // RECIBIR LOS NUEVOS USUARIOS DEL SERVIDOR
  getUsers() {
    let observableDos = new Observable(observer => {
      this.socket.on('userlist', (users) => {
        observer.next(users);
      });
    });
    return observableDos;
  }

  // RECIBIR LOS MENSAJES ANTERIORES
  getOldMessages() {
  let observableTres = new Observable(observer => {
    this.socket.on('load old msgs', (oldmessages) => {
      observer.next(oldmessages);
    });
  });
  return observableTres;
  }


  // getUsers() {
  //   let observableDos = new Observable(observer => {
  //     this.socket.on('userlist', (user) => {
  //       observer.next(user);
  //     });
  //   });
  //   return observableDos;
  // }


}

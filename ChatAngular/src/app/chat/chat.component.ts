import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
  // providers: [ChatService]
})
export class ChatComponent implements OnInit {

  msgs = [];
  message: string;
  messages = [];
  user: string;
  users = [];
  oldmessages = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private chatService: ChatService
  ) {
    this.user = localStorage.getItem('email');
  }

  // TOMAR EL CONTENIDO DEL INPUT PARA MANDARLO AL SERVIDOR
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {

    this.eventService.getChat().subscribe(
      res => {
        this.msgs = res;
        // console.log(this.msgs);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 500) {
            this.router.navigate(['/login']);
          }
        }
      }
    );

    // RECIBIR MENSAJES ANTERIORES
    this.chatService.getOldMessages().subscribe((oldmessages) => {
      // for(let i = 0; i < Object.keys(oldmessages).length; i++) {
      //     this.oldmessages.push(oldmessages[i]);
      // }
      for(let i = Object.keys(oldmessages).length - 1; i >= 0 ; i--) {
          this.oldmessages.push(oldmessages[i]);
      }
      // console.log(this.oldmessages);
    });

    // RECIBIR CADA MENSAJE PARA AGREGARLO AL ARREGLO Y MOSTRARLO EN PANTALLA
    this.chatService.getMessages().subscribe((message) => {
        this.messages.push(message);
        // console.log(message);
    });

    // MANDAR EL USUARIO AL SERVIDOR
    this.chatService.sendUser(this.user);

    // RECIBIR CADA USUARIO PARA AGREGARLO AL ARREGLO Y MOSTRARLO EN PANTALLA
    this.chatService.getUsers().subscribe((users) => {
      this.users = [];
      for(let i = 0; i < Object.keys(users).length; i++) {
          this.users.push(users[i]);
      }
      // console.log(this.users);
    });

  }

}

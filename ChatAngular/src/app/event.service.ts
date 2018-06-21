import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = "http://localhost:9000/api/events";
  private specialUrl = "http://localhost:9000/api/special";
  private chatUrl = "http://localhost:9000/api/chat";

  constructor(private http: HttpClient) {

  }

  getEvents() {
    return this.http.get<any>(this.eventsUrl);
  }

  getSpecial() {
    return this.http.get<any>(this.specialUrl);
  }

  getChat() {
    return this.http.get<any>(this.chatUrl);
  }

}

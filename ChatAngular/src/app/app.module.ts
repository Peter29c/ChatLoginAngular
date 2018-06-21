import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Rutas
import { routing, appRoutingProviders } from './app.routing';

// COMPONENTES
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialComponent } from './special/special.component';
import { AuthService } from './auth.service';
import { ChatComponent } from './chat/chat.component';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthGuard,
    EventService,
    ChatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

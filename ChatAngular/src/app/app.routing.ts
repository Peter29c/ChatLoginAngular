import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialComponent } from './special/special.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {path: '', component: EventsComponent},
  {path: 'events', component: EventsComponent},
  {
    path: 'special',
    component: SpecialComponent,
    canActivate: [AuthGuard]
  },
  { // PARA ACCEDER TIENE QUE ESTAR LOGUEADO (EXISTE EL TOKEN)
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: EventsComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

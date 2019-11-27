import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AdminGuard } from './admin.guard';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { GetLocationComponent } from './get-location/get-location.component';
import { ListingsComponent } from './listings/listings.component';
import { ChatComponent } from './chat/chat.component';
import { InstitutionComponent } from './institution/institution.component';
import { AdminComponent } from './admin/admin.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);
const redirectLoggedInToGetLocation = () => redirectLoggedInTo(['get-location']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToGetLocation,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToGetLocation,
    },
  },
  {
    path: 'get-location',
    component: GetLocationComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'listings',
    component: ListingsComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'institution',
    component: InstitutionComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './home/home.component';
import { GetLocationComponent } from './get-location/get-location.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);
const redirectLoggedInToGetLocation = () => redirectLoggedInTo(['get-location']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home',
    component: HomeComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard],
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { GetLocationComponent } from './get-location/get-location.component';
import { RegisterComponent } from './register/register.component';
import { ListingsComponent } from './listings/listings.component';
import { ChatComponent } from './chat/chat.component';
import { InstitutionComponent } from './institution/institution.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GetLocationComponent,
    RegisterComponent,
    ListingsComponent,
    ChatComponent,
    InstitutionComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase, 'snhu'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

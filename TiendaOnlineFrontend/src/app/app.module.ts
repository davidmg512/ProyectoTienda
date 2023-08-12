import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

import { PerfilComponent } from './perfil/perfil.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {initializeApp} from '@angular/fire/app';
import {provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionDirective } from './session.directive';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PerfilComponent,
    InicioComponent,
    LoginComponent,
    SessionDirective,
    EditarperfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

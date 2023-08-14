import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

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
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PerfilComponent,
    InicioComponent,
    LoginComponent,
    SessionDirective,
    EditarperfilComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: (http: HttpClient) =>
    { return new TranslateHttpLoader(http, "./assets/i18n/", ".json"); }, deps: [HttpClient], }, }),
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


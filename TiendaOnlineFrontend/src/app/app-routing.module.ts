import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { EditarperfilComponent } from './editarperfil/editarperfil.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'register', component: RegisterComponent,  ...canActivate(() => redirectLoggedInTo(['/perfil']))},
  { path: 'perfil', component: PerfilComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'login', component: LoginComponent,  ...canActivate(() => redirectLoggedInTo(['/perfil']))},
  { path: 'perfil/editar', component: EditarperfilComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  { path: 'login/resetpasssword', component: ResetpasswordComponent, ...canActivate(() => redirectLoggedInTo(['/perfil']))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

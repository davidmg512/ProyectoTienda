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
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component';
import { ProductListComponent } from './product-list/product-list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { CarritoComponent } from './carrito/carrito.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CarritoListaComponent } from './carrito-lista/carrito-lista.component';
import { CarouselProductsComponent } from './carousel-products/carousel-products.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';






 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PerfilComponent,
    InicioComponent,
    LoginComponent,
    SessionDirective,
    EditarperfilComponent,
    ResetpasswordComponent,
    NavbarComponent,
    PanelAdministracionComponent,
    ProductListComponent,
    CarritoComponent,
    CarritoListaComponent,
    CarouselProductsComponent,
    RecomendacionesComponent,
    DetallesProductoComponent,
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
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatChipsModule,
    MatSliderModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


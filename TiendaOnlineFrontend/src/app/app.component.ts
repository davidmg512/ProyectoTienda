import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TiendaOnlineFrontend';

  data: any;

  constructor(private http: HttpClient,public translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.addLangs(['en', 'es']); // Agrega los idiomas admitidos
    this.translate.use('en')
   }

  

  getData() {
    this.http.get<any>('http://localhost:3000/api/data').subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error al obtener los datos del backend', error);
      }
    );
  }
}


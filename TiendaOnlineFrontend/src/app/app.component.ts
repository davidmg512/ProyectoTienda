import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TiendaOnlineFrontend';

  data: any;

  constructor(private http: HttpClient) { }

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


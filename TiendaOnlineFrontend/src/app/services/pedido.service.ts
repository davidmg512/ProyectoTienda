import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  //private baseUrl = "https://sushopnode.onrender.com";
  //private baseUrl = "http://localhost:3000";
  private baseUrl = environment.apiUrl;

  
  config = {};
  token: string | null;

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem('token'); 

    this.config = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  getPedidos(): Observable<any>{
    return this.http.get(`${this.baseUrl}/orders/byuser`, this.config);
  }

  getCategorias(): Observable<any>{
    return this.http.get(`${this.baseUrl}/orders/categorias`, this.config);
  }
}

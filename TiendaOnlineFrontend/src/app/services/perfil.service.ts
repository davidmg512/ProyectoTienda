import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url: string = "https://sushopnode.onrender.com";
  config = {};
  token: string | null;

  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token'); 

    this.config = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  getPerfil():Observable<any>{
    return this.http.get(`${this.url}/user/perfil`, this.config);
  }

  updatePerfil(formData:any):Observable<any>{
    return this.http.put(`${this.url}/updateUser`, formData, this.config);
  }
}

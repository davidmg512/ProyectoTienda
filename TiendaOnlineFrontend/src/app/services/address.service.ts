import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url: string = "http://localhost:3000/";
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

  getAddresses(): Observable<any>{
    return this.http.get(`${this.url}user/addresses/`, this.config);
  }
}

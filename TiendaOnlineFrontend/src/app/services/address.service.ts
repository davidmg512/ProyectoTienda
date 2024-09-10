import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url: string = "https://sushopbackend.vercel.app/";
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

  getMainAddress(): Observable<any>{
    return this.http.get(`${this.url}main_address`, this.config);
  }

  addAdress(formData:any): Observable<any>{
    return this.http.post(`${this.url}address/`,formData, this.config);
  }

  updateAddress(formData:any, id:string): Observable<any>{
    return this.http.put(`${this.url}address/${id}`,formData, this.config);
  }

  deleteAddress(id:string): Observable<any>{
    return this.http.delete(`${this.url}address/${id}`, this.config);
  }

  setMainAddress(id:string): Observable<any>{
    return this.http.put(`${this.url}main_address/${id}`,"", this.config);
  }
}

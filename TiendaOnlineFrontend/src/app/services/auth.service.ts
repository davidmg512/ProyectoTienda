import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isTokenExpired(token:any){
    const decodedToken:any = jwtDecode(token);
    const tiempoActual = Date.now() / 1000;

    return decodedToken.exp < tiempoActual;
  }
}

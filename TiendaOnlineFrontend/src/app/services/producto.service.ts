import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  producto!: Producto;
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

  getAllProductos(page: number, limit: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.baseUrl}/product`, { params });  
  }

  getProductById(id:string){
    
    return this.http.get(`${this.baseUrl}/product/${id}`);
  }

  crearProducto(data: any): Observable<any>
  {
    
      let numero = Math.floor(Math.random() * 20) + 1
      var datos = {nombre: data.nombre, descripcion: data.descripcion, precio: data.precio, stock: data.stock, imagen: "producto_"+numero+".jpg"};
      return this.http.post<any>(`${this.baseUrl}/`, datos);
    
  }

  obtenerDestacados(): Observable<any>{
    return this.http.get(`${this.baseUrl}/product/destacados`);
  }

  obtenerPorCategoria(categoria:string): Observable<any>{
    const params = new HttpParams().set('categoria', categoria)
    .set('page', 1)
    .set('limit', 5);
    return this.http.get(`${this.baseUrl}/product/categoria`, { params } );
  }

}

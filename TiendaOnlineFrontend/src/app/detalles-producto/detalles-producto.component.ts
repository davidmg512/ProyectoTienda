import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { CarritoServiceService } from '../services/carrito-service.service';
import { Producto } from '../model/producto';
import { UserServiceTsService } from '../services/user.service.ts.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent {

  producto!: Producto;
  error: boolean = false;

  isLoggedIn:boolean = false;

  constructor(private route: ActivatedRoute, 
    private productoService: ProductoService, 
    private cestaService: CarritoServiceService, 
    private userService:UserServiceTsService,
    private router:Router) {

    this.isLoggedIn = userService.isLoggedIn();
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if(productId != null){
      this.loadProductDetails(productId);
    }
    
  }

  loadProductDetails(id: string): void {
    this.productoService.getProductById(id).subscribe(
      (data: any) => {
        const { _id, ...resto } = data;
        this.producto = { id: _id || data.id, ...resto };
      },
      (error: any) => {
        console.log("Error al obtener el producto.");
        //error = true;
      }
    )
  }

  addToCart(): void {
    this.cestaService.addToCart(this.producto);
  }

  navegarAnterior(){
    window.history.back();
  }

  /*
  modificarDialog(){
    const dialogRef = this.dialog.open(ModificarProductoDialogComponent, {
      data: { producto: this.producto },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadProductDetails(Number(this.route.snapshot.paramMap.get('id')));
    });
  }*/
}

import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { CarritoServiceService } from '../services/carrito-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent {

  producto!: Producto;
  error: boolean = false;

  constructor(private route: ActivatedRoute, private productoService: ProductoService, private cestaService: CarritoServiceService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(productId);
  }

  loadProductDetails(id: number): void {
    this.productoService.getProductById(id).subscribe(
      (data: any) => {
        this.producto = data;
        console.log(this.producto);
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

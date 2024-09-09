import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { UserServiceTsService } from '../services/user.service.ts.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {
  @ViewChildren('productosSlider') productosSliders!: QueryList<ElementRef>;

  constructor(private pedidosService: PedidoService, private userService: UserServiceTsService){}

  productos = [
    { id: 1, imagen: 'producto_1.jpg', nombre: 'Smartphone', precio: 299.99 },
    { id: 2, imagen: 'producto_2.jpg', nombre: 'Auriculares', precio: 79.99 },
    { id: 3, imagen: 'producto_3.jpg', nombre: 'Camiseta', precio: 19.99 },
    { id: 4, imagen: 'producto_4.jpg', nombre: 'Chaqueta', precio: 49.99 },
    { id: 5, imagen: 'producto_5.jpg', nombre: 'Sofá', precio: 399.99 },
    { id: 6, imagen: 'producto_6.jpg', nombre: 'Mesa', precio: 129.99 },
    { id: 7, imagen: 'producto_7.jpg', nombre: 'Muñeca', precio: 24.99 },
    { id: 8, imagen: 'producto_8.jpg', nombre: 'Coche de juguete', precio: 34.99 },
  ];

  categorias = [];

  ngAfterViewInit() {
    // Puedes inicializar aquí cualquier lógica que necesite ejecutarse después de que la vista esté inicializada
  }

  ngOnInit(){
    if(this.userService.isLoggedIn()){
      this.getCategorias();
    }
    
  }

  nextSlide(index: number) {
    const sliderElement = this.productosSliders.toArray()[index].nativeElement;
    sliderElement.scrollLeft += 200; // Ajusta el valor según la cantidad de desplazamiento deseada
  }

  prevSlide(index: number) {
    const sliderElement = this.productosSliders.toArray()[index].nativeElement;
    sliderElement.scrollLeft -= 200; // Ajusta el valor según la cantidad de desplazamiento deseada
  }

  getCategorias(){
    this.pedidosService.getCategorias().subscribe({
      next:(response) => {
        this.categorias = response;
        console.log(this.categorias);
      },
      error:(error) => {
        console.log(error);
        console.log("Error obteniendo las categorias.");
      }
    })
  }
}

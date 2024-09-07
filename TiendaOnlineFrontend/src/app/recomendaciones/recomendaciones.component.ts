import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {
  @ViewChild('productosSlider') productosSlider!: ElementRef;

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

  categorias = [
    { id: 1, nombre: 'Electrónica' },
    { id: 2, nombre: 'Ropa' },
    { id: 3, nombre: 'Hogar' },
    { id: 4, nombre: 'Juguetes' },
  ];

  ngAfterViewInit() {
    // Puedes inicializar aquí cualquier lógica que necesite ejecutarse después de que la vista esté inicializada
  }

  nextSlide() {
    const sliderElement = this.productosSlider.nativeElement;
    sliderElement.scrollLeft += 200; // Ajusta el valor según la cantidad de desplazamiento deseada
  }

  prevSlide() {
    const sliderElement = this.productosSlider.nativeElement;
    sliderElement.scrollLeft -= 200; // Ajusta el valor según la cantidad de desplazamiento deseada
  }
}

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Producto } from '../model/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-carousel-products',
  templateUrl: './carousel-products.component.html',
  styleUrls: ['./carousel-products.component.css']
})
export class CarouselProductsComponent implements AfterViewInit{

  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;

  private cellCount: number = 9;
  private selectedIndex: number = 0;

  productos:Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngAfterViewInit() {
    this.obtenerProductos();
    this.initCarousel();
  }

  obtenerProductos(){
    this.productoService.obtenerDestacados().subscribe(
      (response: any) => {

        this.productos = response.data.map((dbProducto: any) => {
          return {
            id: dbProducto._id,
            imagen: dbProducto.imagen
          };
        });
        //console.log(this.productos);
      },
      (error: any) => {
        console.log('Error al obtener los productos:', error);
      }
    );
  }

  private initCarousel() {
    this.updateCarouselRotation();
  }

  private updateCarouselRotation() {
    const carousel = this.carouselRef.nativeElement;
    const angle = (this.selectedIndex / this.cellCount) * -360;
    carousel.style.transform = `translateZ(-288px) rotateY(${angle}deg)`;
  }

  prev() {
    this.selectedIndex = (this.selectedIndex - 1 + this.cellCount) % this.cellCount;
    this.updateCarouselRotation();
  }

  next() {
    this.selectedIndex = (this.selectedIndex + 1) % this.cellCount;
    this.updateCarouselRotation();
  }

  replaceImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = '/assets/placeholder.jpg';
  }
}

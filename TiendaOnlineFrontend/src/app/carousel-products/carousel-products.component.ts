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
  private carouselInterval: any;
  private inactivityTimeout: any;
  private readonly INACTIVITY_DELAY = 4000; // 5 segundos de inactividad
  private readonly ROTATE_INTERVAL = 3000; // Intervalo de rotación automática
  private isUserInteracting: boolean = false;

  productos:Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngAfterViewInit() {
    this.obtenerProductos();
    this.initCarousel();
    this.startAutoRotate();
    this.setupUserActivityListeners();
    
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);  // Limpia el intervalo cuando el componente se destruye
    }
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);  // Limpia el temporizador de inactividad
    }
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

  private startAutoRotate() {
    this.carouselInterval = setInterval(() => {
      if (!this.isUserInteracting) {
        this.next(false);  // Avanza al siguiente elemento si no hay interacción del usuario
      }
    }, this.ROTATE_INTERVAL);  // 5000 ms = 5 segundos
  }

  private setupUserActivityListeners() {
    const events = ['mousemove', 'keydown', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, this.resetInactivityTimer.bind(this));
    });
  }

  private resetInactivityTimer() {
    this.isUserInteracting = true; // Marca que el usuario está interactuando
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.isUserInteracting = false; // Marca que el usuario no está interactuando
    }, this.INACTIVITY_DELAY);
  }

  prev() {
    this.isUserInteracting = true; // Marca que el usuario está interactuando
    clearTimeout(this.inactivityTimeout); // Detén el temporizador de inactividad
    this.selectedIndex = (this.selectedIndex - 1 + this.cellCount) % this.cellCount;
    this.updateCarouselRotation();
  }

  next(userInteracting:boolean) {
    if(userInteracting){
      this.isUserInteracting = true; // Marca que el usuario está interactuando
      clearTimeout(this.inactivityTimeout); // Detén el temporizador de inactividad
    }
    
    this.selectedIndex = (this.selectedIndex + 1) % this.cellCount;
    this.updateCarouselRotation();
  }

  replaceImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = '/assets/placeholder.jpg';
  }
}

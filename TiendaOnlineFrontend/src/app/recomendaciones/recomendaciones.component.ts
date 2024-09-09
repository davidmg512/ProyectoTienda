import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { UserServiceTsService } from '../services/user.service.ts.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {
  @ViewChildren('productosSlider') productosSliders!: QueryList<ElementRef>;

  constructor(private pedidosService: PedidoService, 
    private userService: UserServiceTsService, 
    private productoService: ProductoService
  ){}

  productos: { [key: string]: any[] } = {};
  categorias: string[] = [];

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
        
        this.categorias.forEach(categoria => {
          this.getProductosPorCategoria(categoria);
        });
      },
      error:(error) => {
        console.log("Error obteniendo las categorias.");
      }
    })
  }

  getProductosPorCategoria(categoria:string){
    this.productoService.obtenerPorCategoria(categoria).subscribe({
      next:(response) => {
        this.productos[categoria] = response.data.data;
      },
      error:(error) => {
        console.log("Error obteniendo los productos de la categoria " + categoria)
      }
    })
  }
}

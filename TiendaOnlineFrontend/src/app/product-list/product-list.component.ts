import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarritoServiceService } from '../services/carrito-service.service';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../model/producto';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('ballAnimation', [
      state('start', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('end', style({
        transform: 'scale(0.1)',
        opacity: 0
      })),
      transition('start => end', [
        animate('0.5s', style({ transform: 'translateX(0)', opacity: 0.5 })),
        animate('0.5s', style({ transform: 'translate(100%, -100%)', opacity: 0 }))
      ])
    ])
  ]
})

export class ProductListComponent{

  animationState: string = 'start';
  productToAdd: any;
  productos: Producto[] = [];
  categorias = ['casual', 'streetwear', 'deportes', 'running']; // Agrega aquí todas las categorías disponibles
  categoriasSeleccionadas: string[] = [];
  productosFiltrados: any[] = this.productos;
  precioMin:number = 0;
  precioMax:number = 1000;
  searchQuery: string = '';

  page: number = 1;
  limit: number = 20;
  total: number = 0;

  constructor(private navbarComponent: NavbarComponent, private carritoService: CarritoServiceService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  addToCart(producto: Producto){
    this.carritoService.addToCart(producto, 1);
  }


  obtenerProductos(): void {
    this.productoService.getAllProductos(this.page, this.limit)
      .subscribe(
        (response: any) => {
          
          this.productos = response.data.map((dbProducto: any) => {
            return {
              Id: dbProducto._id,
              Nombre: dbProducto.Nombre,
              Descripcion: dbProducto.Descripcion,
              Precio: dbProducto.Precio,
              Stock: dbProducto.Stock,
              imagen: dbProducto.imagen,
              Categorias: dbProducto.Categorias
            };
          });

          this.total = response.count;
          this.productosFiltrados = this.productos;
          this.aplicarFiltros();
          console.log(this.productos);
        },
        error => {
          console.log('Error al obtener los productos:', error);
        }
      );
  }

  mapProducto(dbProducto: any): Producto {
    return {
        Id: dbProducto._id,
        Nombre: dbProducto.Nombre,
        Descripcion: dbProducto.Descripcion,
        Precio: dbProducto.Precio,
        Stock: dbProducto.Stock,
        imagen: dbProducto.imagen,
        Categorias: dbProducto.Categorias
    };
  }

  loadMore(): void {
    if (this.page * this.limit < this.total) {
      this.page++;
      this.obtenerProductos();
    }
  }

  

  toggleFiltro(categoria: string) {
    const index = this.categoriasSeleccionadas.indexOf(categoria);
    if (index === -1) {
      this.categoriasSeleccionadas.push(categoria);
    } else {
      this.categoriasSeleccionadas.splice(index, 1);
    }
    this.aplicarFiltros();
  }


  aplicarFiltros() {
    // Asegúrate de que `this.productos` sea un array antes de filtrar
    if (!Array.isArray(this.productos)) {
      console.error('`this.productos` no es un array:', this.productos);
      return;
    }

    let productosFiltradosCategoria = this.productos;

    if (this.categoriasSeleccionadas.length > 0) {
      productosFiltradosCategoria = this.productos.filter(producto =>
        producto.Categorias.some(categoria =>
          this.categoriasSeleccionadas.includes(categoria)
        )
      );
    }

    let productosFiltradosPrecio = productosFiltradosCategoria.filter(
      product => product.Precio >= this.precioMin && product.Precio <= this.precioMax
    );

    this.productosFiltrados = this.filterProducts(productosFiltradosPrecio);
  }

  filterProducts(lista:Producto[]) : Producto[] {
    //this.productosFiltrados = lista;
    if (!this.searchQuery) {
      return lista;
    }else{
        const query = this.searchQuery.toLowerCase();
        return lista.filter(product => {
          return (
            product.Nombre.toLowerCase().includes(query) ||
            product.Descripcion.toLowerCase().includes(query)
          );
        });
    }
  };

  replaceImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = '/assets/placeholder.jpg';
  }
  
}


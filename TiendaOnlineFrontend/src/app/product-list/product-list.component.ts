import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarritoServiceService } from '../services/carrito-service.service';



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

export class ProductListComponent {

  constructor(private navbarComponent: NavbarComponent, private carritoService: CarritoServiceService) { }

  //shopProducts: any[] = [];
  animationState: string = 'start';
  productToAdd: any;

  shopProducts = [
    {id:1, nombre: 'Producto 1', descripcion: 'Descripción del producto 1',categorias:["a"], precio: 500, imagen:'/assets/images/caja.png' },
    {id:2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["b"], precio: 500, imagen:'/assets/images/caja.png' },
    {id:3, nombre: 'Producto 3', descripcion: 'Descripción del producto 2',categorias:["c"], precio: 100, imagen:'/assets/images/caja.png' },
    {id:4, nombre: 'Producto 4', descripcion: 'Descripción del producto 2',categorias:["a","b"], precio: 400, imagen:'/assets/images/caja.png' },
    {id:5, nombre: 'Producto 5', descripcion: 'Descripción del producto 2',categorias:["b","c"], precio: 800, imagen:'/assets/images/caja.png' },
    {id:6, nombre: 'Producto 6', descripcion: 'Descripción del producto 2',categorias:["c","d"], precio: 900, imagen:'/assets/images/caja.png' },

  ];

  // Inicialmente muestra todos los productos

  categorias = ['a', 'b', 'c', 'd']; // Agrega aquí todas las categorías disponibles
  categoriasSeleccionadas: string[] = [];

  productosFiltrados: any[] = this.shopProducts;
  precioMin:number = 0;
  precioMax:number = 1000;
  searchQuery: string = '';

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  addToCart(producto: any){
    this.carritoService.addToCart(producto);
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
    let productosFiltradosCategoria = this.shopProducts;
    
    if (this.categoriasSeleccionadas.length > 0) {
      productosFiltradosCategoria = this.shopProducts.filter(producto =>
        producto.categorias.some(categoria =>
          this.categoriasSeleccionadas.includes(categoria)
        )
      );
    }

    let productosFiltradosPrecio = productosFiltradosCategoria.filter(
      product => product.precio >= this.precioMin && product.precio <= this.precioMax
    );

    console.log(this.searchQuery);
    this.productosFiltrados = this.filterProducts(productosFiltradosPrecio);
  }

  filterProducts(lista:any) : any[] {
    this.productosFiltrados = lista;
    if (!this.searchQuery) {
      return lista;
    }else{
        const query = this.searchQuery.toLowerCase();
        return this.productosFiltrados.filter(product => {
          return (
            product.nombre.toLowerCase().includes(query) ||
            product.descripcion.toLowerCase().includes(query)
          );
        });
    }
  };

  
}


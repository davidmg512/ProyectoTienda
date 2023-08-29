import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  //shopProducts: any[] = [];

  shopProducts = [
    { nombre: 'Producto 1', descripcion: 'Descripción del producto 1',categorias:["a"], precio: 500, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["b"], precio: 500, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["c"], precio: 100, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["a","b"], precio: 400, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["b","c"], precio: 800, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["c","d"], precio: 900, imagen:'/assets/images/caja.png' },

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


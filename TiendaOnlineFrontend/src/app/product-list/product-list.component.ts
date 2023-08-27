import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  //shopProducts: any[] = [];

  shopProducts = [
    { nombre: 'Producto 1', descripcion: 'Descripción del producto 1',categorias:["a","b"], precio: 19.99, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["a","c"], precio: 29.99, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["c"], precio: 29.99, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["a","b"], precio: 29.99, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["a","b"], precio: 29.99, imagen:'/assets/images/caja.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2',categorias:["a","b"], precio: 29.99, imagen:'/assets/images/caja.png' },

  ];

  // Inicialmente muestra todos los productos

  categorias = ['a', 'b', 'c', 'd']; // Agrega aquí todas las categorías disponibles
  categoriasSeleccionadas: string[] = [];

  get productosFiltrados() {
    if (this.categoriasSeleccionadas.length === 0 || this.categoriasSeleccionadas.includes('todo')) {
      return this.shopProducts;
    } else {
      return this.shopProducts.filter(producto => producto.categorias.some(categoria => this.categoriasSeleccionadas.includes(categoria)));
    }
  }

  toggleFiltro(categoria: string) {
    if (categoria === 'todo') {
      this.categoriasSeleccionadas = ['todo'];
    } else {
      const index = this.categoriasSeleccionadas.indexOf(categoria);
      if (index === -1) {
        this.categoriasSeleccionadas.push(categoria);
      } else {
        this.categoriasSeleccionadas.splice(index, 1);
      }
    }
  }
}

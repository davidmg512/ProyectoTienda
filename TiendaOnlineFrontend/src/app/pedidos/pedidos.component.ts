import { Component } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../model/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  pedidos:Pedido[] = [];

  constructor(private pedidoService: PedidoService){}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos(){
    this.pedidoService.getPedidos().subscribe(
      response => {
        
        this.pedidos = response.data;
      },
      error => {
        console.log(error);
        console.error('Error al obtener pedidos del backend:', error);
      }
    );
  }
}

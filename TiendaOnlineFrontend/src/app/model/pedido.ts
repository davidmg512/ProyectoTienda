import { Direccion } from "./direccion";
import { Producto, CarritoProducto } from "./producto";

export interface Pedido {
    user_id: string;
    total: string;
    productos: CarritoProducto[];
    fecha: string;
    estado: string;
    address: Direccion
}
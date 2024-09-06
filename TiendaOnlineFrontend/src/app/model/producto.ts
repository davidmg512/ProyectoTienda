export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    categorias: string[];
}

export interface CarritoProducto extends Producto {
    cantidad: number;
}
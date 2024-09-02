export interface Producto {
    Id?: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Stock: number;
    imagen: string;
    Categorias: string[];
}

export interface CarritoProducto extends Producto {
    cantidad: number;
}
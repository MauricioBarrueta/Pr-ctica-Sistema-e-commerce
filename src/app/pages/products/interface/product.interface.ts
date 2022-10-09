/**
 * ! Interface: Declara una serie de métodos y propiedades que deben ser implementados por una o más clases
 * * Las interfaces vienen a suplir la imposibilidad de herencia múltiple
 */
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    categoryId: number;
    stock: number;
    cant: number;
}


/* Service general */
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";

@Injectable(
    {providedIn: 'root'}
)

export class shoppingCartService {
    products: Product[] = []; /* Este array almacena los productos que se vayan agregando al carrito */
    /**
     *! A direrencia del Observable(Subject), BehaviorSubject necesita un valor por defecto */
    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private cantSubject = new BehaviorSubject<number>(0);

    // Getters que devuelven los observables a la aplicación
    /* 
    *Se suele poner el signo '$' cuando se trabaja con Observables */
   
   /* Observable del total de la compra */
    get totalAction$(): Observable<number> { 
        return this.totalSubject.asObservable();
    }

    /* Observable que muestra la cantidad de elementos añadidos al carrito */
    get cantAction$(): Observable<number> { 
        return this.cantSubject.asObservable();
    }

    /* Observable que guarda todos los elementos añadidos al carrito */
    get cartAction$(): Observable<Product[]> { 
        return this.cartSubject.asObservable();
    }

    /*
    * Método publico para que pueda ser usado en el componente (product) */
    updateCart(product: Product): void {
        this.addToCart(product);
        this.cantidadProductos();
        this.calcTotal();
    }
    /**
     * ! Métodos para gestionar las funciones del carrito */
    // Método que calcula el total y el subtotal (price * cant) de la compra
    private calcTotal(): void {
        const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.cant), 0);
        /* Se pasa el resultado al Observable */
        this.totalSubject.next(total);
    }

    // Método para saber la cantidad de productos añadidos al carrito
    private cantidadProductos(): void {
        const cant = this.products.reduce((acc, prod) => acc += prod.cant, 0);        
        this.cantSubject.next(cant );
    }

    // Método para saber la cantidad de productos añadidos al carrito
    private addToCart(product: Product): void {

        /* En caso de que un mismo producto se añada 2 o más veces se agrupa para que no se duplique en la tabla */
        const isProductInCart = this.products.find(({id}) => id == product.id);
        
        /* Si encuentra el primer elemento que coincida con la condición se aumenta la cantidad en vez de agregarse nuevamente */
        if(isProductInCart) {
            isProductInCart.cant +=1;
        /* Si no, se concatena la cantidad al producto que se recibió */
        } else {
            this.products.push({ ...product, cant: 1 }) // Se concatena la variable cantidad al producto que se recibe
        }       

        this.cartSubject.next(this.products);
    }

    // Método para resetear el carrito al hacer una compra
    resetCart(): void {
    /* Se le regresan los valores por defecto de cada Observable y al array Productos */
        this.cartSubject.next([]);
        this.cantSubject.next(0);
        this.totalSubject.next(0);
        this.products = [];
    }
}
import { Component, OnInit } from '@angular/core';
import { delay, switchMap, tap } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.services';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { NgForm } from '@angular/forms';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interface/product.interface';
import { shoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';

  /**
     *! INVESTIGAR COMO FUNCIONA EL SWITCHMAP */

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  model = { /* Objeto */
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };

  isDelivery = true; /* Propiedad usada en el metodo de los Radio Buttons */

  cart: Product[] = []; /* Propiedad usada en el método getDataCart */

  stores: Store[] = [];

  /* Se inyecta el service de 'stores' */
  constructor (
    private dataService: DataService, 
    private shoppingCartService: shoppingCartService,
    private productService: ProductsService,
    private router: Router ) { 

      this.checkCartIsEmpty(); // Se llama al método que verifica si el carrito está vacío
    }

  ngOnInit(): void {
    /* Se llama al método para que muestre el array de las stores */
    this.getStore(); 

    /* Se llama el método que le asigna los valores a la propiedad cart */
    this.getDataCart();

    /* Se llama al método que recorre el array 'cart' */
    this.prepareDetails();
  }

  /* Método booleano que verifica si 'delivery' esta seleccionado o no */
  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  /* Método que obtiene las stores */
  private getStore(): void {
    this.dataService.getStores()
    .pipe(tap((stores: Store[]) => this.stores = stores))
    .subscribe();      
  }  

  /* Método que guarda la orden y los detalles de la orden */   
  onSubmit({ value: formData }: NgForm): void { // Se emplea el 'destructuring' 
    
    /* Objeto */
    const data: Order = { 
      ... formData, // Spread Operator (...)
      date: this.getCurrentDate, // Obtiene la fecha del método
     isDelivery: this.isDelivery
    }
    /* Se inyectan en los métodos 'post' los datos  */
    this.dataService.saveOrder(data)
    .pipe(tap(res => console.log('Orden: ', res)),
    switchMap(({id: orderId}) => { /* Se hace un 'destructuring' */  
      const details = this.prepareDetails();     
      return this.dataService.saveDetailsOrder({ details, orderId });
    }),
    /* Reedirecciona a otra página al realizar la compra */
    tap(() => this.router.navigate(['/checkout/thankyou-page'])), 
    delay(2000),  /* Espera 2 segundos y ejecuta el método que restaura el carrito */
    tap(() => this.shoppingCartService.resetCart()),  
    )
    .subscribe();
  }  

  /* Método que gestiona y prepara los details */
  private prepareDetails(): Details[] {
    const details: Details[] = [];
    /**
     ** Recorre el array de la pripiedad 'cart' */
    this.cart.forEach( (product: Product) => {
      /* Se especifican los datos especificos que se quieren recuperar */
      const { id: productId, name: productName, cant, stock } = product;

      const updateStock = (stock - cant); /* Se resta la cantidad comprada del stock del producto */
      /* Se ejecuta el método del service */
      this.productService.updateStock(productId, updateStock)
      .pipe(
        tap(() => details.push({productId, productName, cant}))
      )
      .subscribe()      
    })
    /* Devuelve el array 'details' con las propiedades que se le asignaron en el push() */
    return details;
  }

  /* Método que se subscribe al observable(cartAction$) y pone todos los productos en la propiedad 'cart' */
  private getDataCart(): void {
    this.shoppingCartService.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)) // Se le asigna el array de productos a la propiedad 'cart'
    .subscribe()
  }

  /* Método que obtiene la fecha en formato string */
  private getCurrentDate(): string {
    /* toLocaleDateString: Devuelve la fecha en formato string */
    return new Date().toLocaleDateString();
  }

  /* Método que verifica si el carrito está vacío antes de accesar a '/checkout' */
  private checkCartIsEmpty(): void {    
    this.shoppingCartService.cartAction$
    .pipe(
      tap((products: Product[]) => {
      /* Verifica se 'products' es un arreglo y también si no está vacío */
        if(Array.isArray(products) && !products.length) {
          /* Si está vacío reedirige a la página de Productos */
          this.router.navigate(['/products'])
        }
      })
    )
    .subscribe()

  }
}

/**
 *! Operadores de un Observable (Programación Reactiva)
 *! pipe():
 ** Permiten combinar múltiples funciones en una sola. tiene como argumentos las funciones que se quieren combinar
 ** y regresa una nueva función que, una vez ejecutada, corre las funciones en una sequencia.
 *TODO: Por si misma esta no hace nada, necesita la función subscribe() para producir un resultado a través de dicha función.
 *
 *! tap():
 ** Devuelve un Observable que es idéntico al origen. No modifica el flujo de ninguna manera. 
 ** Es útil para registrar el valor, depurar la secuencia para obtener los valores correctos o realizar cualquier otro efecto secundario.
 *TODO: Se utiliza para interceptar cada emisión en la fuente observable y ejecuta una función, pero devuelve una salida que es idéntica 
 *TODO: a la fuente observable siempre que no encuentre ningún error.
 */

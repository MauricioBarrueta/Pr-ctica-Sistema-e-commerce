import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  /**
   ** Change Detection:
   *! Es el mecanismo o estrategia de detección de cambios de Angular para saber cuando debe actualizar un componente 
   *! o toda la vista en caso de que el 'data' haya sido cambiado 
   ** OnPush: Establece la estrategia CheckOnce (bajo demanda)
   ** Default: Establece la estrategia CheckAlways
   *TODO Los cambios se producen por eventos del mouse, llamadas Ajax, setInterval, setTimeOut */
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent { // implements OnInit 
  /**
   *! Decorador Input: Se usa para recibir datos en un componente, del componente padre (products) a componente hijo (product) */
  @Input() product!: Product;
  /**
   *! Decorador Output: Permite que los datos fluyan del componente hijo(product) al padre(products) */
  @Output() addToCartClick = new EventEmitter<Product>(); /* EventEmitter: permite la creación de un evento perzonalizado */  
  //constructor() { }
  //ngOnInit(): void { }

  // Método personalizado que se ejecuta al dar clic en el botón de agregar al carrito del módulo de Productos
  onClick(): void {
    this.addToCartClick.emit(this.product);
  }
}

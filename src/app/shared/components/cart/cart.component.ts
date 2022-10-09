/**
 * ! Componente del carrito de compras */

import { Component } from "@angular/core";
import { shoppingCartService } from '../../services/shopping-cart.service';

@Component({
    selector: 'app-cart',
    /**
     *! Directiva estructural ngIf: Permite mostrar u ocultar elementos. Tambien puede modificar elementos
     ** Pipe async: Muestra información proveniente de código basado en promises(Observables) */    
    template: `
    <ng-container *ngIf="{total: total$ | async, cantidad: cantidad$ | async } as dataCart">
        <!-- Comprueba si 'dataCart' tiene un valor diferente de nulo, de lo contrario no se muestra en el Header hasta agregar un producto -->
        <ng-container *ngIf="dataCart.total">
            <mat-icon>add_shopping_cart</mat-icon>
            {{dataCart.total | currency}} <!-- Pipe currency = divisas(dolar, peso, etc) -->
            ({{dataCart.cantidad}})
        </ng-container>
    </ng-container>`,     
})

export class CartComponent {

    /* Observables */
    cantidad$ = this.shoppingCartService.cantAction$;
    total$ = this.shoppingCartService.totalAction$;   

    constructor(private shoppingCartService: shoppingCartService) { }
}
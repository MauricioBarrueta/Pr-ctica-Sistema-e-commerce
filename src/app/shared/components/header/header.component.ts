/**
 * ! Todo lo que se muestre en el Header también se mostrará en toda la aplicación */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  //templateUrl: './header.component.html',
  template: `<mat-toolbar color="primary">                
            <!-- Para reedirigir a la página principal desde cualquier ruta -->
                <a [routerLink]="['/']"> Curso Angular Desde Cero </a> <!-- Directiva [routerLink] es el equivalente a 'href' de HTML -->

                <span class="spacer"></span>               

                <app-cart class="mouseHover" (click)="goToCheckout()"></app-cart> <!-- Se renderiza el carrito de compras -->                
             </mat-toolbar>`,
  styleUrls: ['./header.component.css']
})

/**
 ** Se emplea 'NavegateTo': */
export class HeaderComponent { 
  /*
  * Primero se inyecta el módulo de Router en el contructor */
  constructor(private router: Router) { }

  /**
   *! Método para dirigirse al enlace de 'checkout' al dar clic en el carrito de compras
   ** Y después en el método se le asigna el método 'navigate' a la variable de Router y se le pasa un array con la dirección */
  goToCheckout(): void {
    this.router.navigate(['/checkout']);    
  }
}

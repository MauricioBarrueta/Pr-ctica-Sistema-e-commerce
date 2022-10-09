import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductsService } from './services/products.service';
import { Product } from './interface/product.interface';
import { shoppingCartService } from 'src/app/shared/services/shopping-cart.service';

/**
 *! Pipes(|): Su objetivo es transformar la data. Reciben un dato y pueden transformar dicho dato 
    *! Directiva: Son atributos que pueden cambiar la apariencia o el comportamiento del DOM element
    ** Tipos de directivas (Estructurales, De atributos, Customs y Componentes(Directivas con template)) */ 
/**
 * ! Decorador: Tipo especial de delaración que se puede adjuntar a una clase, método, descriptor de acceso, propiedad o parámetro */
@Component({
  selector: 'app-products', // Asi se manda llamar en un documento HTML <app-products></app-products>
  template: `
  <section class="products">
      <!-- La propiedad "product" vendrá del array 'products' de la directiva estructural ngFor" -->
      <app-product (addToCartClick)="addToCart($event)" [product] = "product" *ngFor="let product of products">
      <!-- $event: Ofrece información sobre el evento que se acaba de producir -->
      </app-product>
  </section>`,
  styleUrls: ['./products.component.css']
})

/*
 * * Clase que se desea decorar con este decorador: */
export class ProductsComponent implements OnInit {

products!: Product[];
/**
 *! Para consumir el service se inyecta en el constructor: */
  constructor(private productService: ProductsService, private shoppingCartService: shoppingCartService) { }

  /* Se reciben los datos de la Api y los muestra */
  ngOnInit(): void {
    this.productService.getProducts()
    .pipe(tap((productsList: Product[]) => this.products = productsList)).subscribe();
  }

  /* Método que se ejecuta al dar clic en el botón 'agregar al carrito' */
  addToCart(product: Product): void {
    /**
     ** Se llama al service con los métodos necesarios del carrito */
    this.shoppingCartService.updateCart(product);
  }
}

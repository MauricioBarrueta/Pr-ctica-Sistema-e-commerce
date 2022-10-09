import { Component, OnInit } from '@angular/core';
import { shoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  /**
   *! Recuerda que cuando se manejan observables se suele poner el signo '$' 
   ** Se asignan los Observables del service a las variables: */  
  total$ = this.shoppingCartService.totalAction$;
  cart$ = this.shoppingCartService.cartAction$;


  /* Se inyecta el service que contiene los Observables */
  constructor(private shoppingCartService: shoppingCartService) { }

  ngOnInit(): void {
  }

}

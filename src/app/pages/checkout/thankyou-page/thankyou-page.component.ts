import { Component } from '@angular/core';

@Component({
  selector: 'app-thankyou-page',
  template: `
  <div class="container">
    <h1 class="title"> Gracias por tu compra! :D </h1>
    <p class="content"> Tu orden está en camino</p>
    <span> Primer página hecha en Angular </span>
  </div>`,
  styleUrls: ['./thankyou-page.component.css']
})
export class ThankyouPageComponent { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule 
    /**
     * * Se importo del archivo 'material.module'ts' para quitar el error del HTML
     * * de <mat-card..> */
  ]
})
export class ProductsModule { }

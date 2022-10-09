import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 *! Aquí se insertan todas las rutas de los modulos de la aplicación */

// path = ruta
/**
   *! IMPORTANTE: La ruta del error 404 siempre va al final del listado de rutas, YA QUE SE EJECUTAN EN ORDEN */
const routes: Routes = [  
  { path: '', redirectTo: '/products', pathMatch: 'full'}, /* Cuando la URL esté en blanco se redirige al módulo de Productos */  
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) }, /* Módulo Productos */
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) }, /* Módulo Carrito de compras */
  { path: '**', redirectTo: '', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

const routes: Routes = [{ path: '', component: CheckoutComponent }, { path: 'thankyou-page', loadChildren: () => import('./thankyou-page/thankyou-page.module').then(m => m.ThankyouPageModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopListComponent } from './components/shopList/shopList.component';
import { AddItemComponent } from './components/addItem/addItem.component';
import { AuthGuard } from '../../core/guards/auth-guard.service';
import { ItemDetailsComponent } from './components/itemDetails/itemDetails.component';
import { CartComponent } from './components/cart/cart.component';

const childRoutes: Routes = [
  { path: '', component: ShopListComponent },
  { path: 'newItem', canActivate: [AuthGuard], component: AddItemComponent },
  { path: 'itemDetails', component: ItemDetailsComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ItemRouter {}

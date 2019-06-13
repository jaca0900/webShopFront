import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ItemRouter } from './item.router';
import { ShopListComponent } from './components/shopList/shopList.component';
import { AddItemComponent } from './components/addItem/addItem.component';
import { ItemDetailsComponent } from './components/itemDetails/itemDetails.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    ShopListComponent,
    AddItemComponent,
    ItemDetailsComponent,
    CartComponent
  ],
  imports: [
    ItemRouter,
    SharedModule
  ],
  exports: [
    ShopListComponent,
    AddItemComponent,
    ItemDetailsComponent,
    CartComponent
  ]
})
export class ItemModule { }

import { GenericListComponent } from '../../../shared';
import { Component, OnInit } from '@angular/core';
import { IItem } from '../../models/item.interface';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../shared/constants';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-register',
  templateUrl: 'shopList.component.html',
  styleUrls: ['shopList.component.scss']
})
export class ShopListComponent extends GenericListComponent<IItem> implements OnInit {
  searchVal: string;

  constructor (private router: Router, private itemService: ItemService) {
    super();
  }

  ngOnInit(): void {
    super.init();
    this.searchVal = '';

    this.itemService.getAll()
      .subscribe((items) => {
        console.log('FOUND', items);
        this.total = this.all = items;
        this.setView();
      }, (error) => {
        console.error(error);
      });
  }

  addToCart(item: IItem) {
    StorageService.addToCart(item);
  }

  showDetails(item: IItem) {
    StorageService.setItem('SELECTED_ITEM', item);
    this.router.navigate([CONSTANTS.MAIN_ROUTES.ITEMDETAILS]);
  }
}
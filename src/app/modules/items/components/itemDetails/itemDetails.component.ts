import { Component, OnInit } from '@angular/core';
import { IItem } from '../../models/item.interface';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../shared/constants';

@Component({
  selector: 'app-register',
  templateUrl: 'itemDetails.component.html',
  styleUrls: ['itemDetails.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item: IItem;
  image: string;

  constructor (private router: Router) {}

  ngOnInit(): void {
    this.item = <IItem> (StorageService.getItem('SELECTED_ITEM') || {});

    if (this.item.images.length) {
      this.image = this.item.images.splice(0, 1)[0];
    }
  }

  addToCart() {
    StorageService.addToCart(this.item);
    this.router.navigate([CONSTANTS.MAIN_ROUTES.SHOP]);
  }
}
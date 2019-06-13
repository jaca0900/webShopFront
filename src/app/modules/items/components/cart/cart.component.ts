import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { IItem } from '../../models/item.interface';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../shared/constants';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: IItem[];
  total: number;
  userAccount: number;
  address: string;
  postal: string;
  city: string;
  accounts: { number: string, price: number }[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.accounts = [];
    this.cart = StorageService.getCart();

    this.mapPayment();

    this.userAccount = 0;
    this.address = '';
    this.postal = '';
    this.city = '';
  }

  mapPayment() {
    this.total = 0;

    console.log(this.cart);

    for (const item of this.cart) {
      this.total += item.item_price;
      const index = this.accounts.findIndex((account) => {
        return account.number === item.user.account;
      });

      if (index >= 0) {
        this.accounts[index].price += item.item_price;
      } else {
        this.accounts.push({
          price: item.item_price,
          number: item.user.account
        });
      }
    }
  }

  removeItem(itemId) {
    const itemIndex = this.cart.findIndex((item) => {
      return item.id === itemId;
    });

    this.cart.splice(itemIndex, 1);

    this.mapPayment();
  }

  acceptAndPay() {
    alert('Payment processed');
    StorageService.clearCart();
    this.router.navigate([CONSTANTS.MAIN_ROUTES.SHOP]);
  }
}

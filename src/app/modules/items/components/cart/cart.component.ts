import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { IItem } from '../../models/item.interface';
import { Router } from '@angular/router';

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
  handler: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.accounts = [];
    this.cart = StorageService.getCart();

    this.mapPayment();

    this.userAccount = 0;
    this.address = '';
    this.postal = '';
    this.city = '';

    this.loadStripe();
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
    // alert('Payment processed');
    // StorageService.clearCart();
    // const chk = sha256.x2(`vqTJuNoVXJ74wqve6K1cb0UNF6FOpEQqdev771202${this.total}PLNTest`);
    // window.open(`https://ssl.dotpay.pl/test_payment/?chk=${chk}&id=771202&amount=${this.total}&currency=PLN&description=Test`, 'blank');
    // // this.router.navigate([CONSTANTS.MAIN_ROUTES.SHOP]);

    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51GuZGMAcJVqnEjan8zqK2ilsJM7VlBfPVJPmDxdamZgeXZPAQiKiV75P7zMpkHOgjmqTYUPDTvglTPflwZaxAnKd00UfVxCKso',
      locale: 'pl',
      currency: 'PLN',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: this.total// * 100
    });
  }

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {

        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          }
        });
      };

      window.document.body.appendChild(s);
    }
  }
}

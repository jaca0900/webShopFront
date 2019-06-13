import { Injectable } from '@angular/core';
import { IItem } from '../../../items/models/item.interface';

@Injectable()
export class StorageService {
  public static setItem(key: string, model: { [key: string]: any }) {
    sessionStorage.setItem(key, JSON.stringify(model));
  }

  public static removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  public static  setToken(token: string) {
    sessionStorage.setItem('AUTHTOKEN', token);
  }

  public static  getToken() {
    return sessionStorage.getItem('AUTHTOKEN');
  }

  public static getItem(key: string): {[key: string]: any} {
    return JSON.parse(sessionStorage.getItem(key));
  }

  public static addToCart(item: {[key: string]: any}) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));

    if (!cart) {
      cart = [];
    }

    cart.push(item);

    return sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  public static getCart(): IItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  public static clearCart() {
    sessionStorage.removeItem('cart');
  }
}

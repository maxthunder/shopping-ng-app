import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from "./model/product";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  constructor(
    private http: HttpClient
  ) {}

  addToCart(product) {
    this.items.push(product);
    // add rest call to POST mapping (product) btw cartOrder and PhoneRef
  }

  getItems() : Array<Product> {
    return this.items;
  }

  getTotal() : number {
    let total = 0;
    this.items.forEach(function(value) {
      total += value.price;
    });
    return total;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json')
  }
}

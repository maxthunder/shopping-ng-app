import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiService} from "./api.service";
import {Product} from "./model/product";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  addToCart(product) {
    this.items.push(product);
    // add rest call to POST mapping (product) btw cartOrder and PhoneRef
  }

  getItems() : Array<Product> {
    return this.items;
  }

  getAllProducts() : Array<Product> {
    this.apiService.getProducts().subscribe(
      (response) => {
        this.items = response;
        console.log("in method");
        return this.items;
      }, () => {console.log("Error occurring during error apiService.getItems() call.")
      });
    return null;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json')
  }
}

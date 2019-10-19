import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../cart.service';
import {Product} from "../../model/product";
import {ApiService} from "../../api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  product;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiService: ApiService,
  ) { }

  addCart(product) {
    // window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }

  ngOnInit() {
    console.log("before");
    this.apiService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          console.log("in method");
          this.products = response;
          this.route.paramMap.subscribe(params => {
            console.log("params.get('index'): " + params.get('index'));
            this.product = this.products[+params.get('index')];
            console.log("product set");
          })
        }, () => {
          console.log("Error occurring during error apiService.getProducts() call.")
        });
    console.log("after");



  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

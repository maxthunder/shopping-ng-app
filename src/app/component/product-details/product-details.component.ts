import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../cart.service';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ShoppingService} from "../../shopping.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private shoppingService: ShoppingService,
  ) { }

  addCart(product) {
    this.cartService.addToCart(product);
  }

  ngOnInit() {
    if (this.shoppingService.products) {
      this.route.paramMap.subscribe(params => {
        this.product = this.shoppingService.products[+params.get('index')];
      });
    } else {
      this.shoppingService.getProducts()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            this.shoppingService.products = response;
            this.route.paramMap.subscribe(params => {
              this.product = this.shoppingService.products[+params.get('index')];
            })
          }, () => {
            console.log("Error occurring during error apiService.getProducts() call.")
          });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

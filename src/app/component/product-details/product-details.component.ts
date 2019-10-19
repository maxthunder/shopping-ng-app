import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../../cart.service';
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products: Array<Product>;
  product;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  addCart(product) {
    // window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }

  ngOnInit() {
    console.log("before");
    this.products = this.cartService.getAllProducts();
    console.log("after");


    this.route.paramMap.subscribe(params => {
      this.product = this.products[+params.get('productId')];
    })
  }

}

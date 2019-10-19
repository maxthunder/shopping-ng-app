import {Component, OnInit} from '@angular/core';

import {ApiService} from "../../api.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Array<Product>;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe(
      (response) => {this.products = response}
    );
  }


  share(name) {
    window.alert('The product \''+name+'\' has been shared!');
  }

  onNotify(name) {
    window.alert('You will be notified when the product \''+name+'\' goes on sale');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

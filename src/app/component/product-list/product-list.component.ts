import {Component, OnDestroy, OnInit} from '@angular/core';

import {ApiService} from "../../api.service";
import {Product} from "../../model/product";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.products = response
        }, () => {
          console.log("Error occurring during error apiService.getProducts() call.")
        });
  }


  share(name) {
    window.alert('The product \''+name+'\' has been shared!');
  }

  onNotify(name) {
    window.alert('You will be notified when the product \''+name+'\' goes on sale');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }
}




/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

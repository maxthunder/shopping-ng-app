import {Component, OnDestroy, OnInit} from '@angular/core';

import {ApiService} from "../../api.service";
import {Product} from "../../model/product";
import {EMPTY, Observable, Subject} from "rxjs";
import {catchError, delay, publishReplay, refCount, retry, takeUntil} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  shoppingSvcConnectionFailure = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ()=>{},
        (error: HttpErrorResponse) => {
        console.error("Unable to connect to shopping service.");
        this.shoppingSvcConnectionFailure = true;
      });

    this.apiService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.products = this.apiService.products = response
        }, ()=> {
          console.log("Error occurring during error apiService.getProducts() call.");
        });
  }

  private name: Observable<string>;

  observableTest() {
    this.name = new Observable(observer => {
      observer.next("Hello from observer.next()");
      observer.complete();
    });

    let subscribe = this.name.subscribe(
      data => {alert(data);},
      // error => {errorHandler(error)},
      // ()=> {final()}
    );
    subscribe.unsubscribe();

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

  wait = new Promise<string>((res)=> {
    setTimeout(function() {
      res('wait for it...');
    },1000)
  })

  dairy = new Promise<string>((res)=> {
    setTimeout(function() {
      res('dairy');
    },3000)
  })
}




/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

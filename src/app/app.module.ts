import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductAlertsComponent } from './component/product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { CartComponent } from './component/cart/cart.component';
import { ShippingComponent } from './component/shipping/shipping.component';
import { PurchaseResultsComponent } from './component/purchase-results/purchase-results.component';
import { PurchaseDetailsComponent } from './component/purchase-details/purchase-details.component';
import { CatImagesComponent } from './component/cat-images/cat-images.component';
import { ZoomDirective } from './zoom.directive';
import { PreviousOrdersComponent } from './component/previous-orders/previous-orders.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'items/:index', component: ProductDetailsComponent },
      { path: 'results', component: PurchaseResultsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'catImages', component: CatImagesComponent },
      { path: 'previousOrders', component: PreviousOrdersComponent },
      { path: 'orderHistory', component: OrderHistoryComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    PurchaseResultsComponent,
    PurchaseDetailsComponent,
    CatImagesComponent,
    ZoomDirective,
    PreviousOrdersComponent,
    OrderHistoryComponent,
    CustomerListComponent,
  ],
  exports: [
    OrderHistoryComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

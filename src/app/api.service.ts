import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./model/customer";
import {CartOrder} from "./model/cart.order";
import {Product} from "./model/product";
import {environment} from "../environments/environment";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private shoppingServicePath:string = environment.hostname + ":" + environment.port;
  products: Product[];

  constructor(private http: HttpClient) {}

  getStatus(): Observable<string> {
    const requestOptions: Object = {
      headers: new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8'),
      responseType: 'text'
    };
    return this.http.get<string>("http://"+this.shoppingServicePath+"/shopping/status", requestOptions);
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>("http://"+this.shoppingServicePath+"/shopping/products")
      .pipe(
        publishReplay(3), // this tells Rx to cache the latest emitted
        refCount());                // and this tells Rx to keep the Observable alive as long as there are any Subscribers);
  }

  getCustomer(name: string): Observable<Customer> {
    const url = "http://"+this.shoppingServicePath+"/shopping/customers/name/"+encodeURIComponent(name);
    return this.http.get<Customer>(url);
  }

  getCustomers() : Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>("http://"+this.shoppingServicePath+"/shopping/customers");
  }

  createCustomer(name: string) : Observable<Customer> {
    const url = "http://"+this.shoppingServicePath+"/shopping/customers/name/" + encodeURIComponent(name);
    return this.http.post<Customer>(url, null);
  }

  createCartOrder(customerId: number, address: string, items: Array<Product>) : Observable<CartOrder> {
    const url = "http://"+this.shoppingServicePath+"/shopping/cartOrders";
    // let productIds: string = "";
    // for (let i = 0; i < items.length; i++) {
    //   productIds += items[i].productRefId.toString();
    // }
    let productIds: Array<number> = new Array<number>();
    for (let i = 0; i < items.length; i++) {
      productIds.push(items[i].productRefId);
    }
    // let params: HttpParams = new HttpParams()
    //   .set("address", address)
    //   .set("customerId", customerId.toString())
    //   .set("productIds", productIds);

    let data = {
      address: address,
      customerId: customerId.toString(),
      productIds: productIds,
    };

    return this.http.post<CartOrder>(url, data);
  }
}

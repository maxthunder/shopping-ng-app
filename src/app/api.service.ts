import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./model/customer";
import {CartOrder} from "./model/cart.order";
import {Product} from "./model/product";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>("http://localhost:8081/shopping/products");
  }

  getCustomer(name: string): Observable<Customer> {
    const url = "http://localhost:8081/shopping/customers/name/"+encodeURIComponent(name);
    return this.http.get<Customer>(url);
  }

  getCustomers() : Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>("http://localhost:8081/shopping/customers");
  }

  createCustomer(name: string) : Observable<Customer> {
    const url = "http://localhost:8081/shopping/customers/name/" + encodeURIComponent(name);
    return this.http.post<Customer>(url, null);
  }

  createCartOrder(customerId: number, address: string, items: Array<Product>) : Observable<CartOrder> {
    const url = "http://localhost:8081/shopping/cartOrders";
    let params: HttpParams = new HttpParams();
    params.set("customerId", customerId.toString());
    params.set("address", address);
    params.set("items", items.join(','));
    return this.http.post<CartOrder>(url, null);
  }
}

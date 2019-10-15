import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { HttpClient } from "@angular/common/http";
import {Customer} from "../customer";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;
  customer: Customer;
  customers: Array<Customer>;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.items = this.cartService.getItems();

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });

    let url = "http://localhost:8081/shopping/customers/name/Maxwell%20Stark";
    console.log("Attempting http at :'" + url + "'");

    let observable = this.http.get<Customer>(url);

    observable.subscribe((response) => {
      this.customer = response;
    });

    // url = "http://localhost:8081/shopping/customers?name=Maxwell+Stark";
    url = "http://localhost:8081/shopping/customers";
    console.log("Attempting http at :'" + url + "'");

    let observable2 = this.http.get<Array<Customer>>(url);

    observable2.subscribe((response) => {
      this.customers = response;
      console.log("this.customers: " + this.customers);
    });



  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData, this.items);
    console.log("customerData.name: " + customerData.name);


    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import {Customer} from "../model/customer";
import {ApiService} from "../api.service";
import {Product} from "../model/product";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Array<Product>;
  checkoutForm;
  customer: Customer;
  address: string;
  customers: Array<Customer>;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    // this.items = this.cartService.getProducts();
    this.products = this.cartService.getItems();

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });

    this.refreshCustomers();
  }

  refreshCustomers() {
    this.apiService.getCustomers().subscribe(
      (response) => {this.customers = response;},
      () => {console.log("Error occurring during error apiService.getCustomers() call.")
      });
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData, this.products);

    // GET customer, or POST and GET new one
    this.apiService.getCustomer(customerData.name).subscribe(
      (response) => {
        this.customer = response;
        if (this.customer) {
        }
      }, (error) => {
        if (error.status == 404) {
          this.apiService.createCustomer(customerData.name).subscribe(
            (response) => {
              this.customer = response;
              this.refreshCustomers();
            }
          );
        }
      });

    // Set address
    this.address = customerData.address;

    // create cart order
    this.apiService.createCartOrder(this.customer.customerId, this.address, this.products);




    // this.items = this.cartService.clearCart();
    // this.checkoutForm.reset();
  }
}

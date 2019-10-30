import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../cart.service';
import {Customer} from "../model/customer";
import {ApiService} from "../api.service";
import {Product} from "../model/product";
import {takeWhile} from "rxjs/operators";
import {Subject} from "rxjs";
import {CartOrder} from "../model/cart.order";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: Array<Product>;
  checkoutForm: FormGroup;
  customer: Customer;
  customers: Array<Customer>;
  productTotal: number;
  submitted: boolean = false;
  cartOrder: CartOrder;
  cartOrderId: number;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.refreshCustomers();
    this.items = this.cartService.getItems();
    this.productTotal = this.cartService.getTotal();
  }

  refreshCustomers() {
    this.apiService.getCustomers()
      .pipe(takeWhile(() => !this.customers))
      .subscribe(
        response => {
          this.customers = response;
        }, () => {
          console.log("Error occurring during error apiService.getCustomers() call.")
        });
  }

  get form() {
    return this.checkoutForm.controls;
  }

  onSubmit(customerData) {
    this.submitted = true;

    if (this.checkoutForm.invalid)
      return;

    // Process checkout data here
    console.warn('Your order has been submitted', customerData, this.items);

    // GET customer, or POST and GET new one
    this.apiService.getCustomer(customerData.name)
      .pipe(takeWhile(() => !this.customer))
      .subscribe(
      response => {
        this.customer = response;
        if (this.customer) {
          let address = customerData.address;
          this.apiService.createCartOrder(this.customer.customerId, address, this.items)
            .pipe(takeWhile(() => !this.cartOrder))
            .subscribe(
              response => {
                this.cartOrder = response;
                this.cartOrderId = this.cartOrder.cartOrderId;

                console.warn("Cart order successfully created: " + JSON.stringify(response));
              });
          this.reset();
        }
      }, error => {
        if (error.status == 404) {
          this.apiService.createCustomer(customerData.name)
            .pipe(takeWhile(() => !this.customer))
            .subscribe(
              response => {
                this.customer = response;
                this.refreshCustomers();
                let address = customerData.address;
                this.apiService.createCartOrder(this.customer.customerId, address, this.items)
                  .pipe(takeWhile(() => !this.cartOrder))
                  .subscribe(
                    response => {
                      console.warn("Cart order successfully created: " + JSON.stringify(response));
                      this.cartOrder = response;
                      this.cartOrderId = this.cartOrder.cartOrderId;
                    }, () => console.error("Error creating new customer."));
              }
            );
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

  private reset() {
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
}

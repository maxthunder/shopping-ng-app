import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../cart.service';
import {Customer} from "../../model/customer";
import {ApiService} from "../../api.service";
import {Product} from "../../model/product";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CartOrder} from "../../model/cart.order";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: Array<Product>;
  checkoutForm: FormGroup;
  customer: Customer;
  customers: Customer[];
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

    this.apiService.getCustomers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.items = this.cartService.getItems();
        this.productTotal = this.cartService.getTotal();
        this.customers = response;
      }, () => {
        console.log("Error occurring during error apiService.getCustomers() call.")
      });

  }

  refreshCustomers() {

  }

  get form() {
    return this.checkoutForm.controls;
  }

  onSubmit(customerData) {
    this.submitted = true;

    if (this.checkoutForm.invalid)
      return;

    // console.warn('Your order has been submitted', customerData, this.items);

    // GET customer, or POST and GET new one
    this.apiService.getCustomer(customerData.name)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
      response => {
        this.customer = response;
        if (this.customer) {
          this.createCartOrder(customerData);
        }
      }, error => {
        if (error.status == 404) {
          this.apiService.createCustomer(customerData.name)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              response => {
                this.customer = response;
                this.apiService.getCustomers()
                  .pipe(takeUntil(this.unsubscribe$))
                  .subscribe(response => {
                    this.createCartOrder(customerData);
                    this.customers = response;
                  }, () => {
                    console.log("Error occurring during error apiService.getCustomers() call.")
                  });
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

  private createCartOrder(customerData: any) {
    let address = customerData.address;
    this.apiService.createCartOrder(this.customer.customerId, address, this.items)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.refreshCartOrder(response);
          // console.warn("Cart order successfully created: " + JSON.stringify(response));
        });
    this.reset();
  }

  private refreshCartOrder(cartOrder: CartOrder) {
    this.cartOrder = cartOrder;
    this.cartOrderId = this.cartOrder.cartOrderId;
  }
}

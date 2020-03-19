import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../cart.service';
import {Customer} from "../../model/customer";
import {Product} from "../../model/product";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CartOrder} from "../../model/cart.order";
import {ShoppingService} from "../../shopping.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  customers: Array<Customer>;
  items: Array<Product>;
  checkoutForm: FormGroup;
  customer: Customer;
  productTotal: number;
  submitted: boolean = false;
  cartOrder: CartOrder;
  cartOrderId: number;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private shoppingService: ShoppingService,
  ) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

  get form() {
    return this.checkoutForm.controls;
  }

  onSubmit(customerData) {
    this.submitted = true;

    if (this.checkoutForm.invalid)
      return;

    // GET customer, or POST then GET new one
    this.loadCustomer(customerData);
  }

  loadCustomer(customerData): void {
    this.shoppingService.getCustomer(customerData.name)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.customer = response;
          if (this.customer) {
            this.createCartOrder(customerData);
          }
        }, error => {
          if (error.status == 404) {
            this.shoppingService.createCustomer(customerData.name)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(
                response => {
                  this.customer = response;
                  this.shoppingService.getCustomers()
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(response => {
                      this.createCartOrder(customerData);
                      this.customers = response;
                    }, () => {
                      console.log("Error occurring during error shoppingService.getCustomers() call.")
                    });
                }
              );
          }
        });
  }

  private reset() {
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }

  private createCartOrder(customerData: any) {
    let address = customerData.address;
    this.shoppingService.createCartOrder(this.customer.customerId, address, this.items)
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

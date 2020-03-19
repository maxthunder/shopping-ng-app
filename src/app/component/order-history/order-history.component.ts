import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {ShoppingService} from "../../shopping.service";
import {takeUntil} from "rxjs/operators";
import {Customer} from "../../model/customer";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orderHistoryForm: FormGroup;
  submitted: boolean = false;
  private unsubscribe$ = new Subject<void>();
  customer: Customer;
  customerName: string;

  constructor(
    private formBuilder: FormBuilder,
    private shoppingService: ShoppingService,
  ) { }

  ngOnInit() {
    this.orderHistoryForm = this.formBuilder.group({
      customerName: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

  get form() {
    return this.orderHistoryForm.controls;
  }

  onSubmit(customerData) {
    this.customerName = customerData.customerName;
    this.submitted = true;

    if (this.orderHistoryForm.invalid)
      return;

    this.shoppingService.getCustomer(this.customerName)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.customer = response;
          if (this.customer) {

          }
        }, error => {
          if (error.status == 404) {
            console.log("Customer '"+this.customerName+"' doesn't exist.")
          }
        });
  }
}

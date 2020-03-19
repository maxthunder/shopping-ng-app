import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ShoppingService} from "../../shopping.service";
import {takeUntil} from "rxjs/operators";
import {Customer} from "../../model/customer";
import {Subject} from "rxjs";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  @Input() customers: Array<Customer>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private shoppingService: ShoppingService
  ) {}

  ngOnInit() {
    this.shoppingService.getCustomers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.customers = response;
      }, () => {
        console.log("Error occurring during error shoppingService.getCustomers() call.")
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

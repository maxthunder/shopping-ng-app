import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CartOrder} from "../../model/cart.order";
import {map} from "rxjs/operators";
import {ShoppingService} from "../../shopping.service";

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit, OnChanges {
  @Input()
  customerId: number;
  cartOrders: CartOrder[];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.loadPreviousOrders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerId'])
      // console.log("1 ->" + changes['customerData']);
      this.loadPreviousOrders();
  }

  loadPreviousOrders(): void {
    if (this.customerId)
      this.shoppingService.getCartOrdersByCustomerId(this.customerId)
        .pipe(map(()=> this.cartOrders));
  }

}

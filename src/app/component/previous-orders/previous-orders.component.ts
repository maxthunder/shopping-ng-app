import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApiService} from "../../api.service";
import {CartOrder} from "../../model/cart.order";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit, OnChanges {
  @Input()
  data: number;
  customerId: number;
  cartOrders: CartOrder[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadPreviousOrders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'])
      this.loadPreviousOrders();
  }

  loadPreviousOrders(): void {
    this.customerId = this.data;
    if (this.customerId)
      this.apiService.getCartOrdersByCustomerId(this.customerId)
        .pipe(map(()=> this.cartOrders));
  }

}

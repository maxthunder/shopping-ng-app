import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-purchase-results',
  templateUrl: './purchase-results.component.html',
  styleUrls: ['./purchase-results.component.css']
})
export class PurchaseResultsComponent implements OnInit, OnChanges {
  @Input()
  data: number;
  cartOrderId: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['data']) {
      this.cartOrderId = this.data;
    }
  }

}

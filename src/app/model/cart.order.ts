import {PurchasedItem} from "./purchased-item";

export interface CartOrder {
  cartOrderId: number;
  address: string;
  customerId: number;
  purchasedItems: PurchasedItem[];
}

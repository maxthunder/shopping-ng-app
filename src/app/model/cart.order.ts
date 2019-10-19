import {Product} from "./product";

export interface CartOrder {
  customerId: number;
  address: string;
  items: Array<Product>;
}

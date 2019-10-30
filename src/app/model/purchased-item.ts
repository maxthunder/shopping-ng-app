export class PurchasedItem {
  private _purchasedItemId: number;
  private _cartOrderId: number;
  private _productRefId: number;

  constructor(purchasedItemId: number, cartOrderId: number, productRefId: number) {
    this._purchasedItemId = purchasedItemId;
    this._cartOrderId = cartOrderId;
    this._productRefId = productRefId;
  }

  get purchasedItemId(): number {
    return this._purchasedItemId;
  }

  set purchasedItemId(value: number) {
    this._purchasedItemId = value;
  }

  get cartOrderId(): number {
    return this._cartOrderId;
  }

  set cartOrderId(value: number) {
    this._cartOrderId = value;
  }

  get productRefId(): number {
    return this._productRefId;
  }

  set productRefId(value: number) {
    this._productRefId = value;
  }
}

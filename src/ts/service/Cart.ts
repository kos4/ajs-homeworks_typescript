import Buyable from '../domain/Buyable';

export default class Cart {
  private _items: Buyable[] = [];

  add(item: Buyable): void {
    const cartId = this.checkProductInCart(item.id);

    if (cartId !== null) {
      if (!item.eProduct) {
        this._items[cartId].quantity += 1;
      }
    } else {
      this._items.push(item);
    }
  }

  get items(): Buyable[] {
    return [...this._items];
  }

  get sumProducts(): number {
    return this._items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getSum(discount :number = 0): number {
    let sum = this.sumProducts;

    if (discount > 0) {
      sum = sum - sum * discount / 100;
    }

    return sum;
  }

  remove(id: number): void {
    for (let i = 0; i < this._items.length; i += 1) {
      if (this._items[i].id === id) {
        this._items.splice(i, 1);
        break;
      }
    }
  }

  checkProductInCart(id :number) :number|null {
    let index = null;

    if (this._items.length > 0) {
      for (let i = 0; i < this._items.length; i += 1) {
        if (this._items[i].id === id) {
          index = i;
        }
      }
    }

    return index;
  }

  changeQuantity(id :number, action :string) :void {
    const cartId = this.checkProductInCart(id);

    if (cartId !== null && !this._items[cartId].eProduct) {
      if (action === 'minus') {
        this._items[cartId].quantity -= 1;
      } else {
        this._items[cartId].quantity += 1;
      }

      if (this._items[cartId].quantity < 0) {
        this._items[cartId].quantity = 1;
      }
    } else {
      throw new Error('ИД товара не найден в корзине');
    }
  }
}

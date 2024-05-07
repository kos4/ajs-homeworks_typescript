import Buyable from './Buyable';

export default class Product implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly quantity: number = 1,
    readonly eProduct: boolean = false,
  ) { }
}

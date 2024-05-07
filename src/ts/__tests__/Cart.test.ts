import Cart from '../service/Cart';
import Book from "../domain/Book";
import MusicAlbum from "../domain/MusicAlbum";
import Movie from "../domain/Movie";
import Product from "../domain/Product";

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('add product to cart', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  expect(cart.items.length).toBe(1);
});

test('get sum product in cart', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(1010, 'Мстители', 1000, 2012, 'США', 'Avengers Assemble!', ['фантастика', 'боевик', 'фэнтези', 'приключения'], 137));
  expect(cart.sumProducts).toBe(3900);
});

test('get sum cart of discounted', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(1010, 'Мстители', 1000, 2012, 'США', 'Avengers Assemble!', ['фантастика', 'боевик', 'фэнтези', 'приключения'], 137));
  expect(cart.getSum(10)).toBe(3510);
});

test('get sum cart', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(1010, 'Мстители', 1000, 2012, 'США', 'Avengers Assemble!', ['фантастика', 'боевик', 'фэнтези', 'приключения'], 137));
  expect(cart.getSum()).toBe(3900);
});

test('remove product from cart', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(1010, 'Мстители', 1000, 2012, 'США', 'Avengers Assemble!', ['фантастика', 'боевик', 'фэнтези', 'приключения'], 137));
  cart.remove(1010);
  expect(cart.items.length).toBe(2);
});

test('count product add to cart duplicate eProduct', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  expect(cart.items.length).toBe(1);
});

test('quantity product add to cart duplicate eProduct', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  expect(cart.items[0].quantity).toBe(1);
});

test('quantity product add to cart duplicate product', () => {
  const cart = new Cart();
  cart.add(new Product(1012, 'Наушники', 2000));
  cart.add(new Product(1012, 'Наушники', 2000));
  expect(cart.items[0].quantity).toBe(2);
});

test('change quantity product to cart plus', () => {
  const cart = new Cart();
  cart.add(new Product(1012, 'Наушники', 2000));
  cart.changeQuantity(1012, 'plus');
  expect(cart.items[0].quantity).toBe(2);
});

test('change quantity product to cart minus', () => {
  const cart = new Cart();
  cart.add(new Product(1012, 'Наушники', 2000));
  cart.changeQuantity(1012, 'plus');
  cart.changeQuantity(1012, 'plus');
  cart.changeQuantity(1012, 'minus');
  expect(cart.items[0].quantity).toBe(2);
});

test('change quantity product to cart minus < 0', () => {
  const cart = new Cart();
  cart.add(new Product(1012, 'Наушники', 2000));
  cart.changeQuantity(1012, 'plus');
  cart.changeQuantity(1012, 'plus');
  cart.changeQuantity(1012, 'minus');
  cart.changeQuantity(1012, 'minus');
  cart.changeQuantity(1012, 'minus');
  cart.changeQuantity(1012, 'minus');
  expect(cart.items[0].quantity).toBe(1);
});

test('change quantity product not cart', () => {
  expect(() => {
    const cart = new Cart();
    cart.changeQuantity(111, 'plus');
  }).toThrow();
});

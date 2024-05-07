import Cart from './service/Cart';
import Book from './domain/Book';
import MusicAlbum from './domain/MusicAlbum';
import Movie from './domain/Movie';
import Product from "./domain/Product";

const cart = new Cart();
console.log(cart.items);

cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
cart.add(new Movie(1010, 'Мстители', 1000, 2012, 'США', 'Avengers Assemble!', ['фантастика', 'боевик', 'фэнтези', 'приключения'], 137));
cart.add(new Product(1012, 'Наушники', 2000));
cart.add(new Product(1012, 'Наушники', 2000));

console.log(cart.items);
console.log(cart.sumProducts);
console.log(cart.getSum(10));
cart.remove(1010);
cart.changeQuantity(1012, 'plus');
cart.changeQuantity(1012, 'plus');
cart.changeQuantity(1012, 'minus');
console.log(cart.items);

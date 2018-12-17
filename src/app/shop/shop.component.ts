import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { HttpResponse } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  books: any;
  cartBooks: any = [];

  constructor(private bookService: BookService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.bookService.findBooks().subscribe((data: HttpResponse<any>) => {
      this.books = data.body.books;
    });

  }

  addToCart(e, bookManipulated) {
    this.cartBooks.push(bookManipulated[0]);

    this.localStorageService.setCart(this.cartBooks);
    this.localStorageService.setCartProductsNumber(this.cartBooks.length);

    e.target.classList.remove('btn-dark');
    e.target.classList.add('btn-danger');
    e.target.innerHTML = 'Remove <i class="fa fa-minus"></i>';

  }

  removeFromCart(e, isbn) {
    let indexToRemove = this.cartBooks.map((i) => { return i.isbn }).indexOf(isbn);
    this.cartBooks.splice(indexToRemove, 1);

    this.localStorageService.setCart(this.cartBooks);
    this.localStorageService.setCartProductsNumber(this.cartBooks.length);

    e.target.classList.remove('btn-danger');
    e.target.classList.add('btn-dark');
    e.target.innerHTML = 'Add to cart <i class="fa fa-cart-plus"></i>';
  }

  cart(e, isbn: string) {

    let bookManipulated = this.books.filter((book) => {
      return book.isbn == isbn;
    });

    if (this.localStorageService.getCart() != null) {

      let cartIsbns = JSON.parse(this.localStorageService.getCart()).map((b) => {
        return b.isbn;
      });

      let present = (cartIsbns.indexOf(isbn) != -1);

      if (!present) {
        this.addToCart(e, bookManipulated);
      } else {
        this.removeFromCart(e, isbn);
      }

    }else{

      this.addToCart(e, bookManipulated);
    }
  }

}

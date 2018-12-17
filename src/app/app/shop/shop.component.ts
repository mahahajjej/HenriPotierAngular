import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  books: any;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    this.bookService.findBooks().subscribe((data: HttpResponse<any>) => {
      this.books = data.body;
      console.log(this.books);
    });

  }

}

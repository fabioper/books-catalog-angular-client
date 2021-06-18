import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../core/services/books/books.service";
import { BookModel } from "../../core/models/book.model";

interface Book {
  releaseDate: Date;
  author: string;
  id: number;
  title: string;
  coverUri: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: BookModel[] = [];
  defaultCoverUri = 'https://via.placeholder.com/250x400?text=Sem+Capa';

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(result => {
      this.books = result;
    });
  }

}

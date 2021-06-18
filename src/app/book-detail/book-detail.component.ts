import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { BooksService } from "../core/services/books/books.service";
import { BookModel } from "../core/models/book.model";
import { MessageService } from "primeng/api";
import { catchError } from "rxjs/operators";

export interface BookDetailsComponentConfig {
  bookId: number;
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  private _bookData: BookDetailsComponentConfig;
  private book: BookModel | undefined;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private messageService: MessageService,
              private booksService: BooksService) {
    this._bookData = this.config.data
  }

  ngOnInit(): void {
    this.loadBookData(this._bookData.bookId)
  }

  private loadBookData(bookId: number) {
    this.booksService.getBookDetails(bookId).pipe(
      catchError(err => {

      })
    ).subscribe(book => {
      this.book = book;
      this.config.showHeader = true;
      this.config.header = this.book.title;
    })
  }
}

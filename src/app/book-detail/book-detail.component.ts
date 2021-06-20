import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { BooksService } from "../core/services/books/books.service";
import { BookModel } from "../core/models/book.model";
import { ToastrService } from "../shared/services/toastr.service";

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
  book: BookModel | undefined;
  defaultCoverUri = 'https://via.placeholder.com/250x400?text=Sem+Capa';

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private toastrService: ToastrService,
              private booksService: BooksService) {
    this._bookData = this.config.data
  }

  ngOnInit(): void {
    this.loadBookData(this._bookData.bookId).then()
  }

  private async loadBookData(bookId: number) {
    try {
      this.book = await this.booksService.getBook(bookId).toPromise();
      this.config.showHeader = true;
      this.config.header = this.book.title;
    } catch (e) {
      if (e.status !== 404) {
        this.toastrService.error('Ocorreu um erro na requisição. Por favor, tente novamente mais tarde');
      } else {
        this.toastrService.error('O livro especificado não se encontra em nosso catálogo ainda.')
      }

      this.ref.close();
    }
  }
}

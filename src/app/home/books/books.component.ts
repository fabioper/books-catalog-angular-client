import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../core/services/books/books.service";
import { BookModel } from "../../core/models/book.model";
import { DialogService } from "primeng/dynamicdialog";
import { BookDetailComponent, BookDetailsComponentConfig } from "../../book-detail/book-detail.component";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

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

  constructor(private booksService: BooksService,
              private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(result => {
      this.books = result;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id && parseInt(id, 10)) {
      this.openBookDetailsDialog(parseInt(id, 10));
    }
  }

  openBookDetailsDialog(bookId: number) {
    const data: BookDetailsComponentConfig = { bookId }

    const ref = this.dialogService.open(BookDetailComponent, {
      showHeader: false,
      width: '70%',
      modal: true,
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      data
    })

    ref.onClose.subscribe(() => {
      this.router.navigate(['/']).then()
    })
  }
}

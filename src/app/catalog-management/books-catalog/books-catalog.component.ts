import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../core/services/books/books.service";
import { BookModel } from "../../core/models/book.model";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
  styleUrls: ['./books-catalog.component.scss']
})
export class BooksCatalogComponent implements OnInit {
  books: BookModel[] = [];
  selectedItems: BookModel[] = [];

  constructor(private booksService: BooksService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadBooks().then();
  }

  private async loadBooks() {
    this.books = await this.booksService.getBooks().toPromise();
  }

  getData(item: any): BookModel {
    return item;
  }

  openNew() {
  }

  deleteSelectedItems(selectedItems: BookModel[]) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir os livros selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Excluir livros selecionados');
        console.log(selectedItems);
      }
    });
  }
}

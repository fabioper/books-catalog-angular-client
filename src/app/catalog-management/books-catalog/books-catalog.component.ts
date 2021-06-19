import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../core/services/books/books.service";
import { BookModel } from "../../core/models/book.model";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { BookFormComponent, BookFormConfig } from "./book-form/book-form.component";

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
  styleUrls: ['./books-catalog.component.scss']
})
export class BooksCatalogComponent implements OnInit {
  books: BookModel[] = [];
  selectedItems: BookModel[] = [];

  constructor(private booksService: BooksService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  getData(item: any): BookModel {
    return item;
  }

  openBookModal(id?: number) {
    const data: BookFormConfig = {
      bookId: id
    };

    const ref = this.dialogService.open(BookFormComponent, {
      header: data.bookId ? 'Editar Livro' : 'Novo Livro',
      width: '40%',
      data
    })
    ref.onClose.subscribe(() => this.loadBooks())
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

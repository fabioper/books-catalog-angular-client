import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BookModel } from "../../models/book.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${ environment.apiRoot }/api/books`);
  }

  getBook(bookId: number): Observable<BookModel> {
    return this.http.get<BookModel>(`${ environment.apiRoot }/api/books/${ bookId }`);
  }

  saveAuthor(author: BookModel, isInclude = true) {

  }

  updateAuthor(author: BookModel) {
    return this.saveAuthor(author, false);
  }
}

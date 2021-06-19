import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BookModel } from "../../models/book.model";
import { environment } from "../../../../environments/environment";

type ImageUploadResponse = { uri: string, name: string };

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

  async saveBook(data: BookModel, isInclude = true) {
    const endpoint = `${ environment.apiRoot }/api/books`;

    if (data.imageFile) {
      const { uri } = await this.uploadImage(data.imageFile).toPromise()
      data.coverUri = uri;
    }

    return isInclude ?
      this.http.post(endpoint, data).toPromise() :
      this.http.put(endpoint, data).toPromise();
  }

  updateBook(book: BookModel) {
    return this.saveBook(book, false);
  }

  private uploadImage(file: File) {
    const formData = new FormData();
    formData.append('data', file);
    formData.append('name', BooksService.getFileName(file));

    return this.http.post<ImageUploadResponse>(`${environment.apiRoot}/api/books/upload-cover`, formData)
  }

  private static getFileName(file: File) {
    return `${ file.name }.${ file.name.split('.').pop() }`;
  }
}

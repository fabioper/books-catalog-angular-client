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
  private endpoint = `${environment.apiRoot}/api/books`

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(this.endpoint);
  }

  getBook(bookId: number): Observable<BookModel> {
    return this.http.get<BookModel>(`${ this.endpoint }/${ bookId }`);
  }

  async saveBook(data: BookModel, isInclude = true) {

    if (data.imageFile) {
      const { uri } = await this.uploadImage(data.imageFile).toPromise()
      data.coverUri = uri;
    }

    return isInclude ?
      this.http.post(this.endpoint, data).toPromise() :
      this.http.put(this.endpoint, data).toPromise();
  }

  updateBook(book: BookModel) {
    return this.saveBook(book, false);
  }

  private uploadImage(file: File) {
    const formData = new FormData();
    formData.append('data', file);
    formData.append('name', BooksService.getFileName(file));

    return this.http.post<ImageUploadResponse>(`${this.endpoint}/upload-cover`, formData)
  }

  private static getFileName(file: File) {
    return `${ file.name }.${ file.name.split('.').pop() }`;
  }

  removeBook(bookId: number) {
    return this.http.delete(this.endpoint + '/' + bookId);
  }
}

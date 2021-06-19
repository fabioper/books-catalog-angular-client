import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthorModel } from "../../models/author.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<AuthorModel[]> {
    return this.http.get<AuthorModel[]>(`${environment.apiRoot}/api/authors`);
  }

  private uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);

    this.http.post(`${environment.apiRoot}/api/authors/upload-image`, formData)
  }
}

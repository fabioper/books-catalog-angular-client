import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthorModel } from "../../models/author.model";
import { environment } from "../../../../environments/environment";

type ImageUploadResponse = { uri: string, name: string };

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
    formData.append('data', file);
    formData.append('name', AuthorService.getFileName(file));

    return this.http.post<ImageUploadResponse>(`${environment.apiRoot}/api/authors/upload-image`, formData)
  }

  private static getFileName(file: File) {
    return `${ file.name }.${ file.name.split('.').pop() }`;
  }

  async saveAuthor(data: AuthorModel) {
    if (data.imageFile) {
      const { uri } = await this.uploadImage(data.imageFile).toPromise()
      data.imageUri = uri;
    }

    return this.http.post(`${environment.apiRoot}/api/authors`, data).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthorModel } from "../../models/author.model";
import { environment } from "../../../../environments/environment";

type ImageUploadResponse = { uri: string, name: string };

interface AuthorFilter {
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {
  }

  getAuthors(filter?: AuthorFilter): Observable<AuthorModel[]> {
    const params = this.getParams(filter);
    console.log(params);

    return this.http.get<AuthorModel[]>(`${ environment.apiRoot }/api/authors`, {
      params: params
    });
  }

  private getParams(obj?: any) {
    return new HttpParams({ fromObject: obj })
  }

  private uploadImage(file: File) {
    const formData = new FormData();
    formData.append('data', file);
    formData.append('name', AuthorService.getFileName(file));

    return this.http.post<ImageUploadResponse>(`${ environment.apiRoot }/api/authors/upload-image`, formData);
  }

  private static getFileName(file: File) {
    return `${ file.name }.${ file.name.split('.').pop() }`;
  }

  async saveAuthor(data: AuthorModel, isInclude = true) {
    const endpoint = `${ environment.apiRoot }/api/authors`;

    if (data.imageFile) {
      const { uri } = await this.uploadImage(data.imageFile).toPromise()
      data.imageUri = uri;
    }

    return isInclude ?
      this.http.post(endpoint, data).toPromise() :
      this.http.put(endpoint, data).toPromise();
  }

  getAuthor(authorId: number): Observable<AuthorModel> {
    return this.http.get<AuthorModel>(`${ environment.apiRoot }/api/authors/${ authorId }`);
  }

  updateAuthor(author: AuthorModel) {
    return this.saveAuthor(author, false);
  }

  removeAuthor(authorId: number) {
    return this.http.delete(`${ environment.apiRoot }/api/authors/${ authorId }`);
  }
}

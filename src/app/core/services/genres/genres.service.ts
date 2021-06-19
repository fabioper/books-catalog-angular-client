import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GenreModel } from "../../models/genre.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private endpoint = `${environment.apiRoot}/api/genres`;

  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get<GenreModel[]>(this.endpoint);
  }

  getGenre(genreId: number) {
    return this.http.get<GenreModel>(this.endpoint + '/' + genreId);
  }

  save(model: GenreModel, isInclude: boolean) {
    return isInclude
      ? this.http.post(this.endpoint, model)
      : this.http.put(this.endpoint, model);
  }

  removeGenre(id: number) {
    return this.http.delete(this.endpoint + '/' + id);
  }
}

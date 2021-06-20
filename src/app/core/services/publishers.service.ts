import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PublisherModel } from "../models/publisher.model";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private endpoint = `${environment.apiRoot}/api/publishers`

  constructor(private http: HttpClient) { }

  getPublishers() {
    return this.http.get<PublisherModel[]>(this.endpoint);
  }

  removePublisher(id: number) {
    return this.http.delete(this.endpoint + '/' + id);
  }

  getPublisher(publisherId: number) {
    return this.http.get(this.endpoint + '/' + publisherId);
  }

  save(model: PublisherModel, isInclude = true) {
    return isInclude
      ? this.http.post(this.endpoint, model)
      : this.http.put(this.endpoint, model);
  }
}

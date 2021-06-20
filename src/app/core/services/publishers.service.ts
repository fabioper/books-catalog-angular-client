import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PublisherModel } from "../models/publisher.model";

export interface PublishersFilter {
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private endpoint = `${environment.apiRoot}/api/publishers`

  constructor(private http: HttpClient) { }

  getPublishers(filter?: PublishersFilter) {
    const params = PublishersService.getParams(filter);
    return this.http.get<PublisherModel[]>(this.endpoint, { params });
  }

  private static getParams(obj?: any) {
    return new HttpParams({ fromObject: obj })
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

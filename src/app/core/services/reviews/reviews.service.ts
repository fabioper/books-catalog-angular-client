import { Injectable } from '@angular/core';
import { BookReviewModel } from "../../models/book-review.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private endpoint = 'https://localhost:5001/api/BookReview';

  constructor(private http: HttpClient) { }

  postReview(data: BookReviewModel) {
    return this.http.post(this.endpoint, data);
  }

  getReviews(bookId: number) {
    const filter = { bookId: bookId }

    return this.http.get<{data: BookReviewModel[]}>(this.endpoint, {
      params: ReviewsService.getParams(filter)
    })
  }

  private static getParams(obj?: any) {
    return new HttpParams({ fromObject: obj })
  }
}

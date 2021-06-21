import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { BooksService } from "../core/services/books/books.service";
import { BookModel } from "../core/models/book.model";
import { ToastrService } from "../shared/services/toastr.service";
import { AuthService } from "../core/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReviewsService } from "../core/services/reviews/reviews.service";
import { BookReviewModel } from "../core/models/book-review.model";
import { OverlayPanel } from "primeng/overlaypanel";
import { tap } from "rxjs/operators";

export interface BookDetailsComponentConfig {
  bookId: number;
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  private _bookData: BookDetailsComponentConfig;
  book: BookModel | undefined;
  defaultCoverUri = 'https://via.placeholder.com/250x400?text=Sem+Capa';
  reviewForm!: FormGroup;
  isLoading = false;
  reviews: BookReviewModel[] = [];

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private toastrService: ToastrService,
              public authService: AuthService,
              private fb: FormBuilder,
              private reviewsService: ReviewsService,
              private booksService: BooksService) {
    this._bookData = this.config.data
  }

  ngOnInit(): void {
    this.loadBookData(this._bookData.bookId).then()
    this.initReviewForm();
  }

  private async loadBookData(bookId: number) {
    try {
      this.book = await this.booksService.getBook(bookId).toPromise();
      this.loadReviews();
    } catch (e) {
      if (e.status !== 404) {
        this.toastrService.error('Ocorreu um erro na requisição. Por favor, tente novamente mais tarde');
      } else {
        this.toastrService.error('O livro especificado não se encontra em nosso catálogo ainda.')
      }

      this.ref.close();
    }
  }

  postReview(op: OverlayPanel) {
    this.isLoading = true;
    const review: BookReviewModel = {
      ...this.reviewForm.value,
      bookId: this.book?.id,
      userGuid: this.authService.loggedUser?.id
    }

    this.reviewsService.postReview(review).pipe(tap(
      () => this.reviewCreated(op),
      e => this.handleError(e)
    )).subscribe()
  }

  private initReviewForm() {
    this.reviewForm = this.fb.group({
      score: [null, Validators.required],
      comment: [null, Validators.required]
    })
  }

  clear(event: MouseEvent, op: OverlayPanel) {
    event.preventDefault();
    this.reviewForm.reset();
    op.hide();
  }

  private loadReviews() {
    if (this.book) {
      this.reviewsService.getReviews(this.book.id).subscribe(reviews => {
        this.reviews = reviews.data;
      })
    }
  }

  private reviewCreated(op: OverlayPanel) {
    this.reviewForm.reset();
    op.hide();
    this.isLoading = false;
    this.toastrService.success('Avaliação publicada.')
    this.loadReviews();
  }

  private handleError(e: any) {
    console.log(e);
    this.isLoading = false;
    this.toastrService.error('Ocorreu um erro ao salvar esta avaliação. Tente novamente mais tarde.')
  }
}

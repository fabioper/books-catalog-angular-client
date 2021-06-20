import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "../../../shared/services/toastr.service";
import { BooksService } from "../../../core/services/books/books.service";
import { AuthorModel } from "../../../core/models/author.model";
import { BookModel } from "../../../core/models/book.model";
import { SelectItem } from "primeng/api";
import { AuthorService } from "../../../core/services/authors/author.service";
import { GenresService } from "../../../core/services/genres/genres.service";
import { PublishersService } from "../../../core/services/publishers.service";

export interface BookFormConfig {
  bookId?: number;
}

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  private readonly _bookData!: BookFormConfig;

  bookForm!: FormGroup;
  isInclude = false;
  isLoading = false;
  authorsOptions: SelectItem[] = [];
  genreOptions: SelectItem[] = [];
  publishersOptions: SelectItem[] = [];

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private authorsService: AuthorService,
              private genresService: GenresService,
              private publishersService: PublishersService,
              private booksService: BooksService) {
    this._bookData = config.data;
    this.isInclude = !this._bookData.bookId;
  }

  ngOnInit(): void {
    this.initForm();

    const { bookId } = this._bookData
    if (bookId) this.loadBookData(bookId);
  }

  private initForm() {
    this.bookForm = this.fb.group({
      title: [null, Validators.required],
      authorIds: [null, Validators.required],
      genreIds: [null, Validators.required],
      publisherIds: [null, Validators.required],
      releaseDate: [null, Validators.required],
      description: [null, Validators.required],
      coverUri: [],
      imageFile: []
    })
  }

  private loadBookData(bookId: number) {
    this.booksService.getBook(bookId).subscribe(book => {
      this.bookForm.patchValue({
        ...book,
        releaseDate: new Date(book.releaseDate),
        genreIds: book.genres.map(x => ({ value: x.id, label: x.name }) as SelectItem),
        publisherIds: book.publishers.map(x => ({ value: x.id, label: x.name }) as SelectItem),
        authorsIds: book.authors.map(x => ({ value: x.id, label: x.name }) as SelectItem)
      })
    })
  }

  cancel($event: MouseEvent) {
    $event.preventDefault();
    this.ref.close();
  }

  async save() {
    this.isLoading = true;

    const book = new BookModel({
      id: this._bookData.bookId,
      ...this.bookForm.value,
      genreIds: this.bookForm.get('genreIds')?.value?.map((x: SelectItem) => x.value),
      authorIds: this.bookForm.get('authorIds')?.value?.map((x: SelectItem) => x.value),
      publisherIds: this.bookForm.get('publisherIds')?.value?.map((x: SelectItem) => x.value)
    });

    try {
      this.isInclude ?
        await this.booksService.saveBook(book) :
        await this.booksService.updateBook(book);

      this.toastrService.success('Livro salvo com sucesso!');
      this.ref.close();
    } catch (e) {
      console.log(e);
      this.toastrService.error('Ocorreu um erro ao salvar este livro. Tente novamente mais tarde.');
    } finally {
      this.isLoading = false;
    }
  }

  fileUpload(selectedFile: any) {
    this.bookForm.get('imageFile')?.setValue(selectedFile?.files[0]);
  }

  loadAuthorOptions($event: any) {
    const query = $event.query;

    this.authorsService.getAuthors({ name: query }).subscribe(result => {
      this.authorsOptions = result.map(a => {
        return ({
          value: a.id,
          label: a.name
        }) as SelectItem;
      })
    })
  }

  loadGenreOptions($event: any) {
    const query = $event.query;

    this.genresService.getGenres({ name: query }).subscribe(result => {
      this.genreOptions = result.map(g => {
        return ({
          value: g.id,
          label: g.name
        } as SelectItem);
      })
    })
  }

  loadPublishersOptions($event: any) {
    const query = $event.query;

    this.publishersService.getPublishers({ name: query }).subscribe(result => {
      this.publishersOptions = result.map(g => {
        return ({
          value: g.id,
          label: g.name
        } as SelectItem);
      })
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "../../../shared/services/toastr.service";
import { BooksService } from "../../../core/services/books/books.service";
import { AuthorModel } from "../../../core/models/author.model";
import { BookModel } from "../../../core/models/book.model";
import { SelectItem } from "primeng/api";
import { AuthorService } from "../../../core/services/authors/author.service";

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

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private authorsService: AuthorService,
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
        authorsIds: book.authors.map(x => ({
          value: x.id,
          label: `${ x.firstName } ${ x.lastName }`
        }) as SelectItem)
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
      authorIds: this.bookForm.get('authorIds')?.value?.map((x: SelectItem) => x.value)
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
          label: a.firstName + ' ' + a.lastName
        }) as SelectItem;
      })
    })
  }
}

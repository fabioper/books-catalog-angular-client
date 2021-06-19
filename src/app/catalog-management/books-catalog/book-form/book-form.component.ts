import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "../../../shared/services/toastr.service";
import { BooksService } from "../../../core/services/books/books.service";
import { AuthorModel } from "../../../core/models/author.model";
import { BookModel } from "../../../core/models/book.model";

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

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fb: FormBuilder,
              private toastrService: ToastrService,
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
        releaseDate: new Date(book.releaseDate)
      })
    })
  }

  cancel() {
    this.ref.close();
  }

  save() {
    const author = new BookModel({
      id: this._bookData.bookId,
      ...this.bookForm.value
    });

    try {
      this.isInclude ?
        this.booksService.saveAuthor(author) :
        this.booksService.updateAuthor(author);

      this.toastrService.success('Livro adicionado com sucesso!');
      this.ref.close();
    } catch(e) {
      console.log(e);
      this.toastrService.error('Ocorreu um erro ao salvar este livro. Tente novamente mais tarde.');
    }
  }

  fileUpload(selectedFile: any) {
    this.bookForm.get('imageFile')?.setValue(selectedFile?.files[0]);
  }
}

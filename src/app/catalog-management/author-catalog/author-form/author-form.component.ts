import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthorService } from "../../../core/services/authors/author.service";
import { AuthorModel } from "../../../core/models/author.model";
import { ToastrService } from "../../../shared/services/toastr.service";
import { tap } from "rxjs/operators";

export interface AuthorFormConfig {
  authorId?: number;
}

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  private readonly _authorData!: AuthorFormConfig;

  authorForm!: FormGroup;
  isInclude = false;
  isLoading = false;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private authorService: AuthorService) {
    this._authorData = config.data;
    this.isInclude = !this._authorData.authorId;
  }

  ngOnInit(): void {
    this.initForm();

    const { authorId } = this._authorData;
    if (authorId) this.loadAuthorData(authorId);
  }

  loadAuthorData(authorId: number) {
    this.authorService.getAuthor(authorId).subscribe(author => {
      this.authorForm.patchValue({
        ...author,
        birthDate: new Date(author.birthDate)
      })
    })
  }

  initForm() {
    this.authorForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      imageFile: [],
      biography: [null, Validators.required],
    });
  }

  cancel($event: MouseEvent) {
    $event.preventDefault();
    this.ref.close();
  }

  async save() {
    this.isLoading = true;

    const author = new AuthorModel({
      id: this._authorData.authorId,
      ...this.authorForm.value
    });

    try {
      this.isInclude ?
        await this.authorService.saveAuthor(author) :
        await this.authorService.updateAuthor(author);

      this.toastrService.success('Autor adicionado com sucesso!');
      this.ref.close();
    } catch (e) {
      console.log(e);
      this.toastrService.error('Ocorreu um erro ao salvar este autor. Tente novamente mais tarde.');
    } finally {
      this.isLoading = false
    }
  }

  fileUpload(selectedFile: any) {
    this.authorForm.get('imageFile')?.setValue(selectedFile?.files[0]);
  }
}

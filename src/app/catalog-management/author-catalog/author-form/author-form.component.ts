import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthorService } from "../../../core/services/authors/author.service";
import { AuthorModel } from "../../../core/models/author.model";
import { ToastrService } from "../../../shared/services/toastr.service";

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

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private authorService: AuthorService) {
    this._authorData = config.data;
  }

  ngOnInit(): void {
    this.initForm();

    const { authorId } = this._authorData;
    if (authorId) this.loadAuthorData(authorId);
  }

  loadAuthorData(authorId: number) {

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

  cancel() {

  }

  async save() {
    console.log(this.authorForm.value)
    const author = new AuthorModel({
      id: this._authorData.authorId,
      ...this.authorForm.value
    });

    try {
      await this.authorService.saveAuthor(author)
      this.toastrService.success('Autor adicionado com sucesso!');
      this.ref.close();
    } catch(e) {
      console.log(e);
      this.toastrService.error('Ocorreu um erro ao salvar este autor. Tente novamente mais tarde.');
    }
  }

  fileUpload(selectedFile: any) {
    this.authorForm.get('imageFile')?.setValue(selectedFile?.files[0]);
  }
}

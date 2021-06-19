import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AuthorService } from "../../../core/services/authors/author.service";

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
      imageUri: [],
      biography: [null, Validators.required],
    });
  }

  cancel() {

  }

  save() {
    console.log(this.authorForm.value);
  }

  fileUpload(selectedFile: any) {
    this.authorForm.get('imageUri')?.setValue(selectedFile?.files[0]);
  }
}

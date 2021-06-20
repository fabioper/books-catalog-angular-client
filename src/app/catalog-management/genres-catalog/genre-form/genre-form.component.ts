import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "../../../shared/services/toastr.service";
import { GenresService } from "../../../core/services/genres/genres.service";
import { GenreModel } from "../../../core/models/genre.model";
import { tap } from "rxjs/operators";

export interface GenreFormConfig {
  genreId?: number;
}

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss']
})
export class GenreFormComponent implements OnInit {
  genreId?: number;
  isInclude = false;
  form!: FormGroup;
  isLoading = false;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private genresService: GenresService) {
    this.genreId = config.data?.genreId;
    this.isInclude = !this.genreId
  }

  ngOnInit(): void {
    this.initForm();
    if (!this.isInclude)
      this.loadGenre(this.genreId!)
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required]
    })
  }

  private loadGenre(genreId: number) {
    this.genresService.getGenre(genreId).subscribe(genre => {
      this.form.patchValue(genre)
    })
  }

  cancel($event: MouseEvent) {
    $event.preventDefault()
    this.ref.close();
  }

  async save() {
    this.isLoading = true;
    const model = new GenreModel({
      id: this.genreId,
      ...this.form.value
    })

    this.genresService.save(model, this.isInclude).pipe(
      tap(() => this.saved(), (e) => this.handleError(e))
    ).subscribe(() => this.isLoading = false)
  }

  private handleError(e: any) {
    console.log(e)
    this.toastrService.error('Ocorreu um erro ao salvar o registro. Tente novamente mais tarde.')
  }

  private saved() {
    this.toastrService.success('Gênero salvo com sucesso')
    this.ref.close()
  }
}

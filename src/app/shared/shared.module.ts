import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsPipe } from './pipes/authors.pipe';
import { GenresPipe } from './pipes/genres.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AuthorsPipe,
    GenresPipe,
    TruncatePipe,
  ],
  exports: [
    AuthorsPipe,
    GenresPipe,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }

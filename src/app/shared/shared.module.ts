import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsPipe } from './pipes/authors.pipe';
import { GenresPipe } from './pipes/genres.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { PublishersPipe } from './pipes/publishers.pipe';


@NgModule({
  declarations: [
    AuthorsPipe,
    GenresPipe,
    TruncatePipe,
    PublishersPipe,
  ],
  exports: [
    AuthorsPipe,
    GenresPipe,
    TruncatePipe,
    PublishersPipe,
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }

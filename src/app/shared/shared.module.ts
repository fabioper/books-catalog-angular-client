import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsPipe } from './pipes/authors.pipe';
import { GenresPipe } from './pipes/genres.pipe';



@NgModule({
  declarations: [
    AuthorsPipe,
    GenresPipe
  ],
  exports: [
    AuthorsPipe,
    GenresPipe
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }

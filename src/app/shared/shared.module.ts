import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsPipe } from './pipes/authors.pipe';
import { GenresPipe } from './pipes/genres.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [
    AuthorsPipe,
    GenresPipe,
    TruncatePipe
  ],
  exports: [
    AuthorsPipe,
    GenresPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }

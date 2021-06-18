import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsPipe } from './pipes/authors.pipe';



@NgModule({
  declarations: [
    AuthorsPipe
  ],
  exports: [
    AuthorsPipe
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }

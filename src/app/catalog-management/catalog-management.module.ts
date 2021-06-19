import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogManagementRoutingModule } from './catalog-management-routing.module';
import { CatalogManagementComponent } from './catalog-management.component';
import { TabViewModule } from "primeng/tabview";
import { BooksCatalogComponent } from './books-catalog/books-catalog.component';
import { AuthorCatalogComponent } from './author-catalog/author-catalog.component';
import { TableModule } from "primeng/table";
import { SharedModule } from "../shared/shared.module";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ConfirmationService } from "primeng/api";


@NgModule({
  declarations: [
    CatalogManagementComponent,
    BooksCatalogComponent,
    AuthorCatalogComponent
  ],
  imports: [
    CommonModule,
    CatalogManagementRoutingModule,
    TabViewModule,
    TableModule,
    SharedModule,
    ToolbarModule,
    ButtonModule,
    RippleModule
  ]
})
export class CatalogManagementModule { }

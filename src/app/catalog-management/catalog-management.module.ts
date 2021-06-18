import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogManagementRoutingModule } from './catalog-management-routing.module';
import { CatalogManagementComponent } from './catalog-management.component';
import { TabViewModule } from "primeng/tabview";


@NgModule({
  declarations: [
    CatalogManagementComponent
  ],
  imports: [
    CommonModule,
    CatalogManagementRoutingModule,
    TabViewModule
  ]
})
export class CatalogManagementModule { }

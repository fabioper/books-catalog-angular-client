import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogManagementComponent } from './catalog-management.component';

const routes: Routes = [{ path: '', component: CatalogManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogManagementRoutingModule { }

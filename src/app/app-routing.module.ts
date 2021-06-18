import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: HomeComponent },
  { path: 'books/:id', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

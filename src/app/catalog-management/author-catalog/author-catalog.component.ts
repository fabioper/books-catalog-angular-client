import { Component, OnInit } from '@angular/core';
import { AuthorModel } from "../../core/models/author.model";
import { AuthorService } from "../../core/services/authors/author.service";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { AuthorFormComponent } from "./author-form/author-form.component";

@Component({
  selector: 'app-author-catalog',
  templateUrl: './author-catalog.component.html',
  styleUrls: ['./author-catalog.component.scss']
})
export class AuthorCatalogComponent implements OnInit {
  authors: AuthorModel[] = [];
  selectedItems: AuthorModel[] = [];

  constructor(private authorsService: AuthorService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadAuthors().then();
  }

  getData(item: any): AuthorModel {
    return item;
  }

  openNew() {
    const data = {};

    const ref = this.dialogService.open(AuthorFormComponent, {
      header: 'Novo Autor',
      width: '60%',
      data
    })
    ref.onClose.subscribe(() => this.loadAuthors().then())
  }

  private async loadAuthors() {
    this.authors = await this.authorsService.getAuthors().toPromise();
  }

  deleteSelectedItems(selectedItems: AuthorModel[]) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir os autores selecionados e seus respectivos livros?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Excluir livros selecionados');
        console.log(selectedItems);
      }
    });
  }
}

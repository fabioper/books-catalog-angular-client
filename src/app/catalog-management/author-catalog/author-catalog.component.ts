import { Component, OnInit } from '@angular/core';
import { AuthorModel } from "../../core/models/author.model";
import { AuthorService } from "../../core/services/authors/author.service";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { AuthorFormComponent, AuthorFormConfig } from "./author-form/author-form.component";
import { ToastrService } from "../../shared/services/toastr.service";
import { catchError, tap } from "rxjs/operators";
import { from, of, pipe } from "rxjs";

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
              private toastrService: ToastrService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadAuthors().then();
  }

  getData(item: any): AuthorModel {
    return item;
  }

  openAuthorModal(id?: number) {
    const data: AuthorFormConfig = {
      authorId: id
    };

    const ref = this.dialogService.open(AuthorFormComponent, {
      header: 'Novo Autor',
      width: '40%',
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
        selectedItems.map(i => {
          this.authorsService.removeAuthor(i.id).pipe(
            tap(
              () => this.toastrService.success('Registros excluídos com sucesso.'),
                  () => this.toastrService.error(`Houve um erro ao remover o registro. Tente novamente mais tarde.`)
            )
          ).subscribe(() => {
            this.loadAuthors()
          })
        })
      }
    });
  }
}

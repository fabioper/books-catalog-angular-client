import { Component, OnInit } from '@angular/core';
import { GenreModel } from "../../core/models/genre.model";
import { GenresService } from "../../core/services/genres/genres.service";
import { DialogService } from "primeng/dynamicdialog";
import { GenreFormComponent, GenreFormConfig } from "./genre-form/genre-form.component";
import { tap } from "rxjs/operators";
import { ConfirmationService } from "primeng/api";
import { ToastrService } from "../../shared/services/toastr.service";

@Component({
  selector: 'app-genres-catalog',
  templateUrl: './genres-catalog.component.html',
  styleUrls: ['./genres-catalog.component.scss']
})
export class GenresCatalogComponent implements OnInit {
  selectedItems: GenreModel[] = [];
  genres: GenreModel[] = [];

  constructor(private genresService: GenresService,
              private confirmationService: ConfirmationService,
              private toastrService: ToastrService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  openGenreModal(id?: number) {
    const data: GenreFormConfig = { genreId: id }

    const ref = this.dialogService.open(GenreFormComponent, {
      header: id ? 'Editar Gênero' : 'Novo Gênero',
      width: '30%',
      data
    })

    ref.onClose.subscribe(() => this.loadGenres());
  }

  deleteSelectedItems(selectedItems: GenreModel[]) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir os gêneros selecionados e seus respectivos livros?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        selectedItems.map(i => {
          this.genresService.removeGenre(i.id!).pipe(
            tap(
              () => this.toastrService.success('Registros excluídos com sucesso.'),
              () => this.toastrService.error(`Houve um erro ao remover o registro. Tente novamente mais tarde.`)
            )
          ).subscribe(() => {
            this.loadGenres()
          })
        })
      }
    });
  }

  getData(item: any): GenreModel {
    return item
  }

  private loadGenres() {
    this.genresService.getGenres().subscribe(genres => {
      this.genres = genres;
    })
  }
}

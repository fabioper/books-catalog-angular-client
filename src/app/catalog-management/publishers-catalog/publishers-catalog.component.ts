import { Component, OnInit } from '@angular/core';
import { PublisherModel } from "../../core/models/publisher.model";
import { ConfirmationService } from "primeng/api";
import { ToastrService } from "../../shared/services/toastr.service";
import { DialogService } from "primeng/dynamicdialog";
import { PublishersService } from "../../core/services/publishers.service";
import { PublisherFormComponent, PublisherFormConfig } from "./publisher-form/publisher-form.component";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-publishers-catalog',
  templateUrl: './publishers-catalog.component.html',
  styleUrls: ['./publishers-catalog.component.scss']
})
export class PublishersCatalogComponent implements OnInit {
  selectedItems: PublisherModel[] = [];
  publishers: PublisherModel[] = [];

  constructor(private confirmationService: ConfirmationService,
              private toastrService: ToastrService,
              private dialogService: DialogService,
              private publishersService: PublishersService) { }

  ngOnInit(): void {
    this.loadPublishers();
  }

  openPublisherModal(id?: number) {
    const data: PublisherFormConfig = { publisherId: id }

    const ref = this.dialogService.open(PublisherFormComponent, {
      header: id ? 'Editar Editora' : 'Nova Editora',
      width: '30%',
      data
    })

    ref.onClose.subscribe(() => this.loadPublishers());
  }

  deleteSelectedItems(selectedItems: PublisherModel[]) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir as editoras selecionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        selectedItems.map(i => {
          this.publishersService.removePublisher(i.id!).pipe(
            tap(
              () => this.toastrService.success('Registro excluído com sucesso.'),
              () => this.toastrService.error(`Houve um erro ao remover o registro. Tente novamente mais tarde.`)
            )
          ).subscribe(() => {
            this.loadPublishers()
          })
        })
      }
    });
  }

  getData(item: any): PublisherModel {
    return item;
  }

  private loadPublishers() {
    this.publishersService.getPublishers().subscribe(publishers => {
      this.publishers = publishers;
    })
  }
}

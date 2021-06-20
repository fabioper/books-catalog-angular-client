import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ToastrService } from "../../../shared/services/toastr.service";
import { PublishersService } from "../../../core/services/publishers.service";
import { GenreModel } from "../../../core/models/genre.model";
import { tap } from "rxjs/operators";
import { PublisherModel } from "../../../core/models/publisher.model";

export interface PublisherFormConfig {
  publisherId?: number;
}

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.scss']
})
export class PublisherFormComponent implements OnInit {
  form!: FormGroup;
  publisherId?: number;
  isInclude = false;
  isLoading = false;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private publishersService: PublishersService) {
    this.publisherId = config.data?.publisherId;
    this.isInclude = !this.publisherId
  }

  ngOnInit(): void {
    this.initForm();
    if (!this.isInclude)
      this.loadPublisher(this.publisherId!)
  }

  save() {
    this.isLoading = true;
    const model = new PublisherModel({
      id: this.publisherId,
      ...this.form.value
    })

    this.publishersService.save(model, this.isInclude).pipe(
      tap(() => this.saved(), (e) => this.handleError(e))
    ).subscribe()
  }

  cancel($event: MouseEvent) {
    $event.preventDefault();
    this.ref.close();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required]
    })
  }

  private loadPublisher(publisherId: number) {
    this.publishersService.getPublisher(publisherId).subscribe(publisher => {
      this.form.patchValue(publisher)
    })
  }

  private saved() {
    this.toastrService.success('Registro salvo com sucesso!');
    this.ref.close();
    this.isLoading = false;
  }

  private handleError(e: any) {
    console.log(e);
    this.toastrService.error('Ocorreu um erro ao salvar este registro. Tente novamente mais tarde.');
    this.isLoading = false;
  }
}

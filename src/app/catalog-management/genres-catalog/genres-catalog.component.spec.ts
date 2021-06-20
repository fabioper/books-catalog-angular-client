import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresCatalogComponent } from './genres-catalog.component';

describe('GenresCatalogComponent', () => {
  let component: GenresCatalogComponent;
  let fixture: ComponentFixture<GenresCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

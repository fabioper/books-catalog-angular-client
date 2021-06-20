import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCatalogComponent } from './books-catalog.component';

describe('BooksCatalogComponent', () => {
  let component: BooksCatalogComponent;
  let fixture: ComponentFixture<BooksCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

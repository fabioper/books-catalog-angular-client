import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersCatalogComponent } from './publishers-catalog.component';

describe('PublishersCatalogComponent', () => {
  let component: PublishersCatalogComponent;
  let fixture: ComponentFixture<PublishersCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishersCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

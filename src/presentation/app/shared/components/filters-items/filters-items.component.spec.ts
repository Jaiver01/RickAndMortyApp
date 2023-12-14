import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersItemsComponent } from './filters-items.component';

describe('FiltersItemsComponent', () => {
  let component: FiltersItemsComponent;
  let fixture: ComponentFixture<FiltersItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltersItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

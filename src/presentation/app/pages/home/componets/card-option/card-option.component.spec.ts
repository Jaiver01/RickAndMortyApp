import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionComponent } from './card-option.component';

describe('CardOptionComponent', () => {
  let component: CardOptionComponent;
  let fixture: ComponentFixture<CardOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

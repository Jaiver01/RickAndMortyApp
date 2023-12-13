import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCardSkeletonComponent } from './character-card-skeleton.component';

describe('CharacterCardSkeletonComponent', () => {
  let component: CharacterCardSkeletonComponent;
  let fixture: ComponentFixture<CharacterCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

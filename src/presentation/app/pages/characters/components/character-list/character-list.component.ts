import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CharacterCardSkeletonComponent } from '../character-card-skeleton/character-card-skeleton.component';
import {
  selectCharacters,
  selectLoading,
} from '../../../../core/store/selectors/character.selectors';
import { ShortCharacterModel } from '../../../../../../domain/models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    CharacterCardSkeletonComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent {
  characters$: Observable<ShortCharacterModel[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.characters$ = this.store.select(selectCharacters);
    this.isLoading$ = this.store.select(selectLoading);
  }
}

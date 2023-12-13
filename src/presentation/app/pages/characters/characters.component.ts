import { Component, OnInit } from '@angular/core';
import { GetCharactersUseCase } from '../../../../domain/usecases/get-characters.usecase';
import { PaginatedDataModel } from '../../../../domain/models/paginated-data.model';
import { ShortCharacterModel } from '../../../../domain/models/character.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharacterCardSkeletonComponent } from './components/character-card-skeleton/character-card-skeleton.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { FiltersSectionComponent } from '../../shared/components/filters-section/filters-section.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    InfiniteScrollModule,
    CharacterCardComponent,
    CharacterCardSkeletonComponent,
    FiltersSectionComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  pagination: PaginatedDataModel<ShortCharacterModel> = {
    info: {
      count: 0,
      pages: 0,
      next: 1,
      prev: null,
    },
  };

  characters: ShortCharacterModel[] = [];
  isLoading: boolean = false;

  constructor(private getCharactersUseCase: GetCharactersUseCase) {}

  ngOnInit(): void {
    this.getCharacters(1);
  }

  onScrollDown(): void {
    if (this.isLoading || !this.pagination.info?.next) {
      return;
    }

    this.getCharacters(this.pagination.info.next);
  }

  getCharacters(page: number): void {
    this.isLoading = true;

    this.getCharactersUseCase.execute({ page }).subscribe({
      next: (paginatedCharacters) => {
        if (paginatedCharacters.data?.length) {
          this.pagination = paginatedCharacters;
          this.characters.push(...paginatedCharacters.data);
        }

        this.isLoading = false;
      },
      error: (err) => {
        // TODO: handle error
        console.error('Error: ' + err.message);
      },
    });
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetUserSettingsUseCase } from '../../../../../domain/usecases/get-user-settings.usecase';
import { SetUserSettingsUseCase } from '../../../../../domain/usecases/set-user-settings.usecase';
import {
  selectCurrentPage,
  selectFilters,
} from '../../../core/store/selectors/filter.selectors';
import { setFilters } from '../../../core/store/actions/filter.actions';
import { CharacterFilter } from '../../../../../domain/models/character.model';
import { EpisodeFilter } from '../../../../../domain/models/episode.model';
import { LocationFilter } from '../../../../../domain/models/location.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  isDarkTheme: boolean = true;

  private timeout: any;
  private currentPage: string = '';
  private currentPageSubscription: Subscription;
  private filters: {
    characters?: CharacterFilter;
    episodes?: EpisodeFilter;
    locations?: LocationFilter;
  } = {};
  private filtersSubscription: Subscription;

  constructor(
    private store: Store,
    private getUserSettingsUseCase: GetUserSettingsUseCase,
    private setUserSettingsUsecase: SetUserSettingsUseCase
  ) {
    this.currentPageSubscription = this.store
      .select(selectCurrentPage)
      .subscribe({
        next: (currentPage) => {
          this.currentPage = currentPage;

          if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
          }
        },
      });

    this.filtersSubscription = this.store.select(selectFilters).subscribe({
      next: (filters) => (this.filters = filters),
    });
  }

  ngOnInit(): void {
    this.getUserSettingsUseCase.execute().subscribe({
      next: (userSettings) => {
        this.isDarkTheme = userSettings.theme === 'dark';
      },
    });
  }

  ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe();
    this.filtersSubscription.unsubscribe();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.setUserSettingsUsecase.execute({
      theme: this.isDarkTheme ? 'dark' : 'retro',
    });
  }

  onSearch(): void {
    if (!this.searchInput || this.currentPage === 'home') {
      return;
    }

    const value = this.searchInput.nativeElement.value;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.store.dispatch(
        setFilters({
          ...this.filters,
          [this.currentPage]: {
            ...(this.filters[
              this.currentPage as 'characters' | 'episodes' | 'locations'
            ] ?? {}),
            name: value,
          },
        })
      );
    }, 400);
  }
}

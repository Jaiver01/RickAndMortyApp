import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShortLocationModel } from '../../../../domain/models/location.model';
import { PaginatedDataModel } from '../../../../domain/models/paginated-data.model';
import { GetLocationsUseCase } from '../../../../domain/usecases/get-locations.usecase';
import { FiltersSectionComponent } from '../../shared/components/filters-section/filters-section.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [RouterModule, InfiniteScrollModule, FiltersSectionComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent implements OnInit {
  pagination: PaginatedDataModel<ShortLocationModel> = {
    info: {
      count: 0,
      pages: 0,
      next: 1,
      prev: null,
    },
  };

  locations: ShortLocationModel[] = [];
  isLoading: boolean = false;

  constructor(private getLocationsUseCase: GetLocationsUseCase) {}

  ngOnInit(): void {
    this.getLocations(1);
  }

  onScrollDown(): void {
    if (this.isLoading || !this.pagination.info?.next) {
      return;
    }

    this.getLocations(this.pagination.info.next);
  }

  getLocations(page: number): void {
    this.isLoading = true;

    this.getLocationsUseCase.execute({ page }).subscribe({
      next: (paginatedLocations) => {
        if (paginatedLocations.data?.length) {
          this.pagination = paginatedLocations;
          this.locations.push(...paginatedLocations.data);
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

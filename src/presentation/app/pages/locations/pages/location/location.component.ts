import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationModel } from '../../../../../../domain/models/location.model';
import { GetLocationUseCase } from '../../../../../../domain/usecases/get-location.usecase';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent implements OnInit {
  locationId: number;
  location?: LocationModel;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private getLocationUseCase: GetLocationUseCase
  ) {
    this.locationId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    this.isLoading = true;

    this.getLocationUseCase.execute({ id: this.locationId }).subscribe({
      next: (location) => {
        if (location) {
          this.location = location;
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

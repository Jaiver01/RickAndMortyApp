import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./pages/characters/characters.component').then(
        (mod) => mod.CharactersComponent
      ),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('./pages/characters/pages/character/character.component').then(
        (mod) => mod.CharacterComponent
      ),
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./pages/episodes/episodes.component').then(
        (mod) => mod.EpisodesComponent
      ),
  },
  {
    path: 'locations',
    loadComponent: () =>
      import('./pages/locations/locations.component').then(
        (mod) => mod.LocationsComponent
      ),
  },
  {
    path: 'locations/:id',
    loadComponent: () =>
      import('./pages/locations/pages/location/location.component').then(
        (mod) => mod.LocationComponent
      ),
  },
];

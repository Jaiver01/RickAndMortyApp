import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { ROOT_EFFECTS, ROOT_REDUCERS } from './core/store/app.state';
import { provideEffects } from '@ngrx/effects';
import { DataModule } from '../../data/data.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(ROOT_REDUCERS),
    provideEffects(ROOT_EFFECTS),
    importProvidersFrom(DataModule),
  ],
};

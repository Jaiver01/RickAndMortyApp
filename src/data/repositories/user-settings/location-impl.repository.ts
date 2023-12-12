import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSettingsRepository } from '../../../domain/repositories/user-settings.repository';
import { UserSettingsModel } from '../../../domain/models/user-settings.model';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsImplRepository extends UserSettingsRepository {
  override getUserSettings(): Observable<UserSettingsModel> {
    const userSettings = localStorage.getItem('userSettings') ?? '';

    let settings: UserSettingsModel = {
      theme: 'dark',
    };

    try {
      settings = JSON.parse(userSettings);
    } catch (error) {
      console.error('Error parsing user settings', error);
    }

    return new Observable((observer) => {
      observer.next(settings);
      observer.complete();
    });
  }

  override setUserSettings(settings: UserSettingsModel): Observable<void> {
    localStorage.setItem('userSettings', JSON.stringify(settings));

    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }
}

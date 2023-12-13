import { Observable, EMPTY } from 'rxjs';
import { UseCase } from '../base/use-case';
import { UserSettingsRepository } from '../repositories/user-settings.repository';
import { UserSettings } from '../models/user-settings.model';

export class SetUserSettingsUseCase implements UseCase<UserSettings, void> {
  constructor(private userSettingsRepository: UserSettingsRepository) {}

  execute(params: UserSettings): Observable<void> {
    this.userSettingsRepository.getUserSettings().subscribe({
      next: (userSettings) => {
        const settings = {
          ...userSettings,
          ...params,
        };

        this.userSettingsRepository.setUserSettings(settings);
      },
    });

    return EMPTY;
  }
}

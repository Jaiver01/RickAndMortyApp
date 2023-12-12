import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { UserSettingsRepository } from '../repositories/user-settings.repository';
import { UserSettingsModel } from '../models/user-settings.model';

export class GetUserSettingsUseCase implements UseCase<{}, UserSettingsModel> {
  constructor(private userSettingsRepository: UserSettingsRepository) {}

  execute(): Observable<UserSettingsModel> {
    return this.userSettingsRepository.getUserSettings();
  }
}

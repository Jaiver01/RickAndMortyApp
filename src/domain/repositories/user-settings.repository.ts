import { Observable } from 'rxjs';
import { UserSettingsModel } from '../models/user-settings.model';

export abstract class UserSettingsRepository {
  abstract getUserSettings(): Observable<UserSettingsModel>;
  abstract setUserSettings(settings: UserSettingsModel): Observable<void>;
}

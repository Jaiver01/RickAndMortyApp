import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetUserSettingsUseCase } from '../../../../../domain/usecases/get-user-settings.usecase';
import { SetUserSettingsUseCase } from '../../../../../domain/usecases/set-user-settings.usecase';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = true;

  constructor(
    private getUserSettingsUseCase: GetUserSettingsUseCase,
    private setUserSettingsUsecase: SetUserSettingsUseCase
  ) {}

  ngOnInit(): void {
    this.getUserSettingsUseCase.execute().subscribe({
      next: (userSettings) => {
        this.isDarkTheme = userSettings.theme === 'dark';
      },
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.setUserSettingsUsecase.execute({
      theme: this.isDarkTheme ? 'dark' : 'retro',
    });
  }
}

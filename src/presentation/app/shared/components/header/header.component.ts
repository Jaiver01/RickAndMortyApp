import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = true;

  ngOnInit(): void {
    // TODO: Move to a service
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    // TODO: Move to a service
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }
}

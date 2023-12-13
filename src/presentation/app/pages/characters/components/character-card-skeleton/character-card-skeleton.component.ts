import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-character-card-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './character-card-skeleton.component.html',
  styleUrl: './character-card-skeleton.component.scss',
})
export class CharacterCardSkeletonComponent {}

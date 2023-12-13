import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShortCharacterModel } from '../../../../../../domain/models/character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input({ required: true }) character?: ShortCharacterModel;
}

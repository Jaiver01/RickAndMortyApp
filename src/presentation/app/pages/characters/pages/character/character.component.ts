import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharacterModel } from '../../../../../../domain/models/character.model';
import { GetCharacterUseCase } from '../../../../../../domain/usecases/get-character.usecase';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [RouterModule, NgxSkeletonLoaderModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnInit {
  characterId: number;
  character?: CharacterModel;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private getCharacterUseCase: GetCharacterUseCase
  ) {
    this.characterId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    this.isLoading = true;

    this.getCharacterUseCase.execute({ id: this.characterId }).subscribe({
      next: (character) => {
        if (character) {
          this.character = character;
        }

        this.isLoading = false;
      },
      error: (err) => {
        // TODO: handle error
        console.error('Error: ' + err.message);
      },
    });
  }
}

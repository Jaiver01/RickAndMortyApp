import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { EpisodeModel } from '../models/episode.model';
import { EpisodeRepository } from '../repositories/episode.repository';

export class GetEpisodeUseCase
  implements UseCase<{ id: number }, EpisodeModel>
{
  constructor(private episodeRepository: EpisodeRepository) {}

  execute(params: { id: number }): Observable<EpisodeModel> {
    return this.episodeRepository.getEpisode(params.id);
  }
}

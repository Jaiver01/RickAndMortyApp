import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';
import { CharacterRepository } from '../domain/repositories/character.repository';
import { GetCharactersUseCase } from '../domain/usecases/get-characters.usecase';
import { CharacterImplRepository } from './repositories/character/character-impl.repository';
import { GetCharacterUseCase } from '../domain/usecases/get-character.usecase';
import { EpisodeRepository } from '../domain/repositories/episode.repository';
import { GetEpisodesUseCase } from '../domain/usecases/get-episodes.usecase';
import { GetEpisodeUseCase } from '../domain/usecases/get-episode.usecase';
import { EpisodeImplRepository } from './repositories/episode/episode-impl.repository';
import { LocationRepository } from '../domain/repositories/location.repository';
import { GetLocationsUseCase } from '../domain/usecases/get-locations.usecase';
import { GetLocationUseCase } from '../domain/usecases/get-location.usecase';
import { LocationImplRepository } from './repositories/location/location-impl.repository';
import { UserSettingsRepository } from '../domain/repositories/user-settings.repository';
import { GetUserSettingsUseCase } from '../domain/usecases/get-user-settings.usecase';
import { UserSettingsImplRepository } from './repositories/user-settings/location-impl.repository';
import { SetUserSettingsUseCase } from '../domain/usecases/set-user-settings.usecase';

const apolloOptionsFactory = () => {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({ uri: environment.graphqlUrl }),
    cache: new InMemoryCache(),
  };
};

const graphqlProvider = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];

const getCharactersUseCaseFactory = (
  charactersRepository: CharacterRepository
) => new GetCharactersUseCase(charactersRepository);

const getCharactersUseCaseProvider = {
  provide: GetCharactersUseCase,
  useFactory: getCharactersUseCaseFactory,
  deps: [CharacterRepository],
};

const getCharacterUseCaseFactory = (
  charactersRepository: CharacterRepository
) => new GetCharacterUseCase(charactersRepository);

const getCharacterUseCaseProvider = {
  provide: GetCharacterUseCase,
  useFactory: getCharacterUseCaseFactory,
  deps: [CharacterRepository],
};

const characterRepositoryProvider = {
  provide: CharacterRepository,
  useClass: CharacterImplRepository,
};

const getEpisodesUseCaseFactory = (episodesRepository: EpisodeRepository) =>
  new GetEpisodesUseCase(episodesRepository);

const getEpisodesUseCaseProvider = {
  provide: GetEpisodesUseCase,
  useFactory: getEpisodesUseCaseFactory,
  deps: [EpisodeRepository],
};

const getEpisodeUseCaseFactory = (episodesRepository: EpisodeRepository) =>
  new GetEpisodeUseCase(episodesRepository);

const getEpisodeUseCaseProvider = {
  provide: GetEpisodeUseCase,
  useFactory: getEpisodeUseCaseFactory,
  deps: [EpisodeRepository],
};

const episodeRepositoryProvider = {
  provide: EpisodeRepository,
  useClass: EpisodeImplRepository,
};

const getLocationsUseCaseFactory = (locationsRepository: LocationRepository) =>
  new GetLocationsUseCase(locationsRepository);

const getLocationsUseCaseProvider = {
  provide: GetLocationsUseCase,
  useFactory: getLocationsUseCaseFactory,
  deps: [LocationRepository],
};

const getLocationUseCaseFactory = (locationsRepository: LocationRepository) =>
  new GetLocationUseCase(locationsRepository);

const getLocationUseCaseProvider = {
  provide: GetLocationUseCase,
  useFactory: getLocationUseCaseFactory,
  deps: [LocationRepository],
};

const locationRepositoryProvider = {
  provide: LocationRepository,
  useClass: LocationImplRepository,
};

const getUserSettingsUseCaseFactory = (
  userSettingsRepository: UserSettingsRepository
) => new GetUserSettingsUseCase(userSettingsRepository);

const getUserSettingsUseCaseProvider = {
  provide: GetUserSettingsUseCase,
  useFactory: getUserSettingsUseCaseFactory,
  deps: [UserSettingsRepository],
};

const setUserSettingsUseCaseFactory = (
  userSettingsRepository: UserSettingsRepository
) => new SetUserSettingsUseCase(userSettingsRepository);

const setUserSettingsUseCaseProvider = {
  provide: SetUserSettingsUseCase,
  useFactory: setUserSettingsUseCaseFactory,
  deps: [UserSettingsRepository],
};

const userSettingsRepositoryProvider = {
  provide: UserSettingsRepository,
  useClass: UserSettingsImplRepository,
};

@NgModule({
  providers: [
    graphqlProvider,
    getCharactersUseCaseProvider,
    getCharacterUseCaseProvider,
    characterRepositoryProvider,
    getEpisodesUseCaseProvider,
    getEpisodeUseCaseProvider,
    episodeRepositoryProvider,
    getLocationsUseCaseProvider,
    getLocationUseCaseProvider,
    locationRepositoryProvider,
    getUserSettingsUseCaseProvider,
    setUserSettingsUseCaseProvider,
    userSettingsRepositoryProvider,
  ],
  imports: [CommonModule],
})
export class DataModule {}

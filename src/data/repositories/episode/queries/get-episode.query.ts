import { gql } from 'apollo-angular';

export const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters
      url
      created
    }
  }
`;

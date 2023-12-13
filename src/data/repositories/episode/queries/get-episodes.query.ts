import { gql } from 'apollo-angular';

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int!, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

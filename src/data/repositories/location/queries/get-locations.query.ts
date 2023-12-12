import { gql } from 'apollo-angular';

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int!, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
      }
    }
  }
`;

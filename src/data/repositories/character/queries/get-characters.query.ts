import { gql } from 'apollo-angular';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        image
      }
    }
  }
`;

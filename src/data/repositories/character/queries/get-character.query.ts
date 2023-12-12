import { gql } from 'apollo-angular';

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin
      location
      image
      episode
      url
      created
    }
  }
`;

import { gql } from 'apollo-angular';

export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      created
    }
  }
`;

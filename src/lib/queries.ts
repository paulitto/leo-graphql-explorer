import { gql } from '@apollo/client';

/*
 * GraphQL query to get characters
 * see reference here: https://rickandmortyapi.com/documentation/#graphql 
 * @param page - page number to get
 * @param filter - filter to apply to the query
 * see format here: https://rickandmortyapi.com/documentation/#filter-characters
 */
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
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
        species
        type
        gender
        image
        origin {
          id
          name
        }
        location {
          id
          name
        }
        episode {
          id
          name
          air_date
        }
      }
    }
  }
`;

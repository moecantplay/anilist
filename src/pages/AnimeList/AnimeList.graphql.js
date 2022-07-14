import { gql } from "@apollo/client";

const AnimeListGQL = gql`
  query($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        hasNextPage
      }
      media {
        id
        title {
          english
          native
        }
        coverImage {
          large
        }
        episodes
        genres
        meanScore
      }
    }
  }
`;

export default AnimeListGQL;

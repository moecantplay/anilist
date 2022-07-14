import { gql } from "@apollo/client";

const AnimeDetailGQL = gql`
  query($id: Int!) {
    Media(id: $id) {
      title {
        english
        native
      }
      bannerImage
      coverImage { extraLarge }
      format
      startDate { year }
      endDate { year }
      episodes
      duration
      status
      genres
      description
      meanScore
      favourites
      countryOfOrigin
    }
  }
  `;

export default AnimeDetailGQL;

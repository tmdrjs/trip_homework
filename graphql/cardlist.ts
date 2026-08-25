import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query GetCards {
    getCards {
      id
      title
      contents
      price
      userName
      bookmarks
      img
      tags
    }
  }
`;

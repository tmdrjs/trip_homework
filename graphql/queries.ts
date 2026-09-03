import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards(
    $page: Int
    $search: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    fetchBoards(
      page: $page
      search: $search
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      writer
      title
      contents
      likeCount
      images
      createdAt
    }
  }
`;

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      images
      createdAt
    }
  }
`;

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        amount
      }
    }
  }
`;
export const Fetch_Travel_Products = gql`
  query FetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {
    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      soldAt
      createdAt
      seller {
        _id
        name
      }
    }
  }
`;

export const FETCH_TRAVEL_PRODUCT = gql`
  query FetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      soldAt
      createdAt
      seller {
        _id
        name
      }
      travelproductAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      buyer {
        _id
        name
      }
    }
  }
`;

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int, $search: String) {
    fetchUseditems(page: $page, search: $search) {
      _id
      name
      remarks
      price
      tags
      images
      pickedCount
      createdAt
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query FetchBoardsCount(
    $search: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
  }
`;

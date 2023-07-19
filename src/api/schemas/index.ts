import gql from "graphql-tag";

export const typeDefs = gql`
  type Card {
    id: ID
    Title: String!
  }
  type Board {
    id: ID
    Title: String
    cards: [Card]
  }

  type Query {
    getBoards: [Board!]
    getBoard(name: String!): Board!
  }
`;

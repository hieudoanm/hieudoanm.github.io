export const typeDefs = `#graphql
  extend type Query {
    openings(eco: String, name: String): [Opening]
  }

  type Opening {
    eco: String
    name: String
    pgn: String
    firstMove: String
    fen: String
    centipawn: Int
  }
`;

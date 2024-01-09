export const typeDefs = `#graphql
  extend type Query {
    streamers(title: Title, country: String): Streamers
  }

  type Streamers {
    total: Int
    players: [Player]
    countries: [Country]
  }

  type Country {
    countryCode: String
    country: String
  }
`;

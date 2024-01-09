export const typeDefs = `#graphql
  extend type Query {
    countries: [TitledCountries]
    country(code: String!): TitledCountry
  }

  type TitledCountries {
    countryCode: String
    country: String
    total: Int
  }

  type TitledCountry {
    averageRapidRating: Float
    averageBlitzRating: Float
    averageBulletRating: Float
    maxRapidRating: Int
    maxBlitzRating: Int
    maxBulletRating: Int
    total: Int
    players: [Player]
    titles: [TitleCount]
  }

  type TitleCount {
    title: String
    total: Int
  }
`;

export const typeDefs = `#graphql
  extend type Query {
    titled(title: Title!, timeRange: TimeRange): Titled
  }

  type Titled {
    averageRapidRating: Float
    averageBlitzRating: Float
    averageBulletRating: Float
    maxRapidRating: Int
    maxBlitzRating: Int
    maxBulletRating: Int
    total: Int
    players: [Player]
  }

  enum TimeRange {
    YEAR
    QUARTER
    MONTH
    WEEK
  }

  enum Title {
    GM
    IM
    FM
    CM
    NM
    WGM
    WIM
    WFM
    WCM
    WNM
  }
`;

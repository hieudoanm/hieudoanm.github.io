export const typeDefs = `#graphql
  extend type Query {
    player(username: String!): Player
  }

  extend type Mutation {
    player(username: String!): Player
    games(username: String!, month: Int, year: Int): GamesSynced
  }

  type GamesSynced {
    total: Int
    synced: Int
    existed: Int
  }

  type Player {
    id: Int
    username: String
    name: String
    followers: Int
    avatar: String
    location: String
    verified: Boolean
    lastOnline: String
    joined: String
    status: String
    title: String
    league: String
    # Streamer
    twitchUrl: String
    isStreamer: Boolean
    # Country
    country: String
    countryCode: String
    # Daily
    statsDailyRatingBest: Int
    statsDailyRatingLast: Int
    statsDailyRatingDeviation: Int
    statsDailyRecordWin: Int
    statsDailyRecordDraw: Int
    statsDailyRecordLoss: Int
    # Rapid
    statsRapidRatingBest: Int
    statsRapidRatingLast: Int
    statsRapidRatingDeviation: Int
    statsRapidRecordWin: Int
    statsRapidRecordDraw: Int
    statsRapidRecordLoss: Int
    # Blitz
    statsBlitzRatingBest: Int
    statsBlitzRatingLast: Int
    statsBlitzRatingDeviation: Int
    statsBlitzRecordWin: Int
    statsBlitzRecordDraw: Int
    statsBlitzRecordLoss: Int
    # Bullet
    statsBulletRatingBest: Int
    statsBulletRatingLast: Int
    statsBulletRatingDeviation: Int
    statsBulletRecordWin: Int
    statsBulletRecordDraw: Int
    statsBulletRecordLoss: Int
    # Games
    archives: [String]
    games: [Game]
  }

  type Game {
    id: String
    url: String
    pgn: String
    timeControl: String
    timeClass: String
    endTime: String
    rated: Boolean
    tcn: String
    initialSetup: String
    rules: String
    whiteId: String
    blackId: String
    whiteUsername: String
    blackUsername: String
    whiteAccuracy: Float
    blackAccuracy: Float
    whiteResult: String
    blackResult: String
    whiteRating: Int
    blackRating: Int
    fen: String
  }
`;

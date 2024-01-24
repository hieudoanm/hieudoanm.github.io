
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.8.1
 * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
 */
Prisma.prismaVersion = {
  client: "5.8.1",
  engine: "78caf6feeaed953168c64e15a249c3e9a033ebe2"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ChessPlayerScalarFieldEnum = {
  id: 'id',
  username: 'username',
  name: 'name',
  followers: 'followers',
  avatar: 'avatar',
  location: 'location',
  country: 'country',
  countryCode: 'countryCode',
  twitchUrl: 'twitchUrl',
  isStreamer: 'isStreamer',
  verified: 'verified',
  lastOnline: 'lastOnline',
  joined: 'joined',
  status: 'status',
  title: 'title',
  league: 'league',
  archives: 'archives',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChessStatsScalarFieldEnum = {
  playerId: 'playerId',
  timeClass: 'timeClass',
  best: 'best',
  last: 'last',
  deviation: 'deviation',
  win: 'win',
  draw: 'draw',
  loss: 'loss',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChessGameScalarFieldEnum = {
  id: 'id',
  url: 'url',
  pgn: 'pgn',
  timeControl: 'timeControl',
  timeClass: 'timeClass',
  endTime: 'endTime',
  rated: 'rated',
  tcn: 'tcn',
  initialSetup: 'initialSetup',
  rules: 'rules',
  fen: 'fen',
  whiteAccuracy: 'whiteAccuracy',
  blackAccuracy: 'blackAccuracy',
  whiteUsername: 'whiteUsername',
  blackUsername: 'blackUsername',
  whiteResult: 'whiteResult',
  blackResult: 'blackResult',
  whiteRating: 'whiteRating',
  blackRating: 'blackRating',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChessOpeningScalarFieldEnum = {
  eco: 'eco',
  name: 'name',
  pgn: 'pgn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ChessStatus = exports.$Enums.ChessStatus = {
  basic: 'basic',
  premium: 'premium',
  staff: 'staff'
};

exports.ChessTitle = exports.$Enums.ChessTitle = {
  GM: 'GM',
  WGM: 'WGM',
  IM: 'IM',
  WIM: 'WIM',
  FM: 'FM',
  WFM: 'WFM',
  CM: 'CM',
  WCM: 'WCM',
  NM: 'NM',
  WNM: 'WNM',
  AGM: 'AGM',
  AIM: 'AIM',
  AFM: 'AFM',
  ACM: 'ACM'
};

exports.ChessLeague = exports.$Enums.ChessLeague = {
  Wood: 'Wood',
  Stone: 'Stone',
  Bronze: 'Bronze',
  Silver: 'Silver',
  Crystal: 'Crystal',
  Elite: 'Elite',
  Champion: 'Champion',
  Legend: 'Legend'
};

exports.ChessTimeClass = exports.$Enums.ChessTimeClass = {
  daily: 'daily',
  classical: 'classical',
  rapid: 'rapid',
  blitz: 'blitz',
  bullet: 'bullet'
};

exports.ChessVariant = exports.$Enums.ChessVariant = {
  bughouse: 'bughouse',
  chess: 'chess',
  chess960: 'chess960',
  crazyhouse: 'crazyhouse',
  kingofthehill: 'kingofthehill',
  oddschess: 'oddschess',
  threecheck: 'threecheck'
};

exports.ChessResult = exports.$Enums.ChessResult = {
  win: 'win',
  fiftymove: 'fiftymove',
  agreed: 'agreed',
  insufficient: 'insufficient',
  repetition: 'repetition',
  stalemate: 'stalemate',
  timevsinsufficient: 'timevsinsufficient',
  checkmated: 'checkmated',
  resigned: 'resigned',
  timeout: 'timeout',
  abandoned: 'abandoned',
  bughousepartnerlose: 'bughousepartnerlose',
  threecheck: 'threecheck',
  kingofthehill: 'kingofthehill'
};

exports.Prisma.ModelName = {
  ChessPlayer: 'ChessPlayer',
  ChessStats: 'ChessStats',
  ChessGame: 'ChessGame',
  ChessOpening: 'ChessOpening'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://github.com/prisma/prisma/issues`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

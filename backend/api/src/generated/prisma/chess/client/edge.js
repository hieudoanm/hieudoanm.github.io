
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/edge')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/backend/api/src/generated/prisma/chess/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "multiSchema"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../../../.env",
    "schemaEnvPath": "../../../../../.env"
  },
  "relativePath": "../../../../../prisma/chess",
  "clientVersion": "5.8.1",
  "engineVersion": "78caf6feeaed953168c64e15a249c3e9a033ebe2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "CHESS_POSTGRESQL_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "ZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiQ0hFU1NfUE9TVEdSRVNRTF9VUkwiKQogIHNjaGVtYXMgID0gWyJjaGVzcyJdCn0KCmdlbmVyYXRvciBjbGllbnQgewogIHByb3ZpZGVyICAgICAgICA9ICJwcmlzbWEtY2xpZW50LWpzIgogIHByZXZpZXdGZWF0dXJlcyA9IFsibXVsdGlTY2hlbWEiXQogIG91dHB1dCAgICAgICAgICA9ICIuLi8uLi9zcmMvZ2VuZXJhdGVkL3ByaXNtYS9jaGVzcy9jbGllbnQiCn0KCmdlbmVyYXRvciBkYm1sIHsKICBwcm92aWRlciA9ICJwcmlzbWEtZGJtbC1nZW5lcmF0b3IiCn0KCmdlbmVyYXRvciBqc29uU2NoZW1hIHsKICBwcm92aWRlciA9ICJwcmlzbWEtanNvbi1zY2hlbWEtZ2VuZXJhdG9yIgp9CgpnZW5lcmF0b3IgbmVzdGpzRHRvIHsKICBwcm92aWRlciAgICAgPSAicHJpc21hLWdlbmVyYXRvci1uZXN0anMtZHRvIgogIG91dHB1dCAgICAgICA9ICIuLi8uLi9zcmMvZ2VuZXJhdGVkL3ByaXNtYS9jaGVzcy9kdG8iCiAgZW50aXR5U3VmZml4ID0gIkR0byIKfQoKZ2VuZXJhdG9yIG1hcmtkb3duIHsKICBwcm92aWRlciA9ICJwcmlzbWEtbWFya2Rvd24iCiAgb3V0cHV0ICAgPSAiLi9SRUFETUUubWQiCn0KCm1vZGVsIENoZXNzUGxheWVyIHsKICBpZCAgICAgICAgICBJbnQgICAgICAgICAgQGlkCiAgdXNlcm5hbWUgICAgU3RyaW5nICAgICAgIEB1bmlxdWUKICBuYW1lICAgICAgICBTdHJpbmcgICAgICAgQGRlZmF1bHQoIiIpCiAgZm9sbG93ZXJzICAgSW50ICAgICAgICAgIEBkZWZhdWx0KDApCiAgYXZhdGFyICAgICAgU3RyaW5nICAgICAgIEBkZWZhdWx0KCIiKQogIGxvY2F0aW9uICAgIFN0cmluZyAgICAgICBAZGVmYXVsdCgiIikKICBjb3VudHJ5ICAgICBTdHJpbmcgICAgICAgQGRlZmF1bHQoIiIpCiAgY291bnRyeUNvZGUgU3RyaW5nICAgICAgIEBkZWZhdWx0KCIiKQogIHR3aXRjaFVybCAgIFN0cmluZyAgICAgICBAZGVmYXVsdCgiIikKICBpc1N0cmVhbWVyICBCb29sZWFuICAgICAgQGRlZmF1bHQoZmFsc2UpCiAgdmVyaWZpZWQgICAgQm9vbGVhbiAgICAgIEBkZWZhdWx0KGZhbHNlKQogIGxhc3RPbmxpbmUgIERhdGVUaW1lICAgICBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6CiAgam9pbmVkICAgICAgRGF0ZVRpbWUgICAgIEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHoKICBzdGF0dXMgICAgICBDaGVzc1N0YXR1cyAgQGRlZmF1bHQoYmFzaWMpCiAgdGl0bGUgICAgICAgQ2hlc3NUaXRsZT8KICBsZWFndWUgICAgICBDaGVzc0xlYWd1ZT8KICBhcmNoaXZlcyAgICBTdHJpbmdbXSAgICAgQGRlZmF1bHQoW10pCgogIHN0YXRzIENoZXNzU3RhdHNbXQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHoKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0egoKICBAQHNjaGVtYSgiY2hlc3MiKQp9CgplbnVtIENoZXNzU3RhdHVzIHsKICBiYXNpYwogIHByZW1pdW0KICBzdGFmZgoKICBAQHNjaGVtYSgiY2hlc3MiKQp9CgplbnVtIENoZXNzTGVhZ3VlIHsKICBXb29kCiAgU3RvbmUKICBCcm9uemUKICBTaWx2ZXIKICBDcnlzdGFsCiAgRWxpdGUKICBDaGFtcGlvbgogIExlZ2VuZAoKICBAQHNjaGVtYSgiY2hlc3MiKQp9CgplbnVtIENoZXNzVGl0bGUgewogIEdNCiAgV0dNCiAgSU0KICBXSU0KICBGTQogIFdGTQogIENNCiAgV0NNCiAgTk0KICBXTk0KICBBR00KICBBSU0KICBBRk0KICBBQ00KCiAgQEBzY2hlbWEoImNoZXNzIikKfQoKbW9kZWwgQ2hlc3NTdGF0cyB7CiAgcGxheWVyICAgIENoZXNzUGxheWVyICAgIEByZWxhdGlvbihmaWVsZHM6IFtwbGF5ZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgcGxheWVySWQgIEludAogIHRpbWVDbGFzcyBDaGVzc1RpbWVDbGFzcyBAZGVmYXVsdChkYWlseSkKICBiZXN0ICAgICAgSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBsYXN0ICAgICAgSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBkZXZpYXRpb24gSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKICB3aW4gICAgICAgSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBkcmF3ICAgICAgSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBsb3NzICAgICAgSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6CiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHoKCiAgQEBpZChbcGxheWVySWQsIHRpbWVDbGFzc10pCiAgQEBzY2hlbWEoImNoZXNzIikKfQoKZW51bSBDaGVzc1RpbWVDbGFzcyB7CiAgZGFpbHkKICBjbGFzc2ljYWwKICByYXBpZAogIGJsaXR6CiAgYnVsbGV0CgogIEBAc2NoZW1hKCJjaGVzcyIpCn0KCm1vZGVsIENoZXNzR2FtZSB7CiAgaWQgICAgICAgICAgICBTdHJpbmcgICAgICAgICBAaWQKICB1cmwgICAgICAgICAgIFN0cmluZyAgICAgICAgIEBkZWZhdWx0KCIiKQogIHBnbiAgICAgICAgICAgU3RyaW5nICAgICAgICAgQGRlZmF1bHQoIiIpCiAgdGltZUNvbnRyb2wgICBTdHJpbmcgICAgICAgICBAZGVmYXVsdCgiIikKICB0aW1lQ2xhc3MgICAgIENoZXNzVGltZUNsYXNzIEBkZWZhdWx0KGRhaWx5KQogIGVuZFRpbWUgICAgICAgRGF0ZVRpbWUgICAgICAgQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0egogIHJhdGVkICAgICAgICAgQm9vbGVhbiAgICAgICAgQGRlZmF1bHQoZmFsc2UpCiAgdGNuICAgICAgICAgICBTdHJpbmcgICAgICAgICBAZGVmYXVsdCgiIikKICBpbml0aWFsU2V0dXAgIFN0cmluZyAgICAgICAgIEBkZWZhdWx0KCIiKQogIHJ1bGVzICAgICAgICAgQ2hlc3NWYXJpYW50ICAgQGRlZmF1bHQoY2hlc3MpCiAgZmVuICAgICAgICAgICBTdHJpbmcgICAgICAgICBAZGVmYXVsdCgiIikKICB3aGl0ZUFjY3VyYWN5IEZsb2F0ICAgICAgICAgIEBkZWZhdWx0KDApCiAgYmxhY2tBY2N1cmFjeSBGbG9hdCAgICAgICAgICBAZGVmYXVsdCgwKQogIHdoaXRlVXNlcm5hbWUgU3RyaW5nICAgICAgICAgQGRlZmF1bHQoIiIpCiAgYmxhY2tVc2VybmFtZSBTdHJpbmcgICAgICAgICBAZGVmYXVsdCgiIikKICB3aGl0ZVJlc3VsdCAgIENoZXNzUmVzdWx0ICAgIEBkZWZhdWx0KGNoZWNrbWF0ZWQpCiAgYmxhY2tSZXN1bHQgICBDaGVzc1Jlc3VsdCAgICBAZGVmYXVsdChjaGVja21hdGVkKQogIHdoaXRlUmF0aW5nICAgSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBibGFja1JhdGluZyAgIEludCAgICAgICAgICAgIEBkZWZhdWx0KDApCiAgY3JlYXRlZEF0ICAgICBEYXRlVGltZT8gICAgICBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6CiAgdXBkYXRlZEF0ICAgICBEYXRlVGltZT8gICAgICBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHoKCiAgQEBzY2hlbWEoImNoZXNzIikKfQoKZW51bSBDaGVzc1Jlc3VsdCB7CiAgd2luCiAgZmlmdHltb3ZlCiAgYWdyZWVkCiAgaW5zdWZmaWNpZW50CiAgcmVwZXRpdGlvbgogIHN0YWxlbWF0ZQogIHRpbWV2c2luc3VmZmljaWVudAogIGNoZWNrbWF0ZWQKICByZXNpZ25lZAogIHRpbWVvdXQKICBhYmFuZG9uZWQKICBidWdob3VzZXBhcnRuZXJsb3NlCiAgdGhyZWVjaGVjawogIGtpbmdvZnRoZWhpbGwKCiAgQEBzY2hlbWEoImNoZXNzIikKfQoKZW51bSBDaGVzc1ZhcmlhbnQgewogIGJ1Z2hvdXNlCiAgY2hlc3MKICBjaGVzczk2MAogIGNyYXp5aG91c2UKICBraW5nb2Z0aGVoaWxsCiAgb2Rkc2NoZXNzCiAgdGhyZWVjaGVjawoKICBAQHNjaGVtYSgiY2hlc3MiKQp9CgplbnVtIENoZXNzUGllY2UgewogIGtpbmcKICBxdWVlbgogIHJvb2sKICBiaXNob3AKICBrbmlnaHQKICBwYXduCgogIEBAc2NoZW1hKCJjaGVzcyIpCn0KCmVudW0gQ2hlc3NTaWRlIHsKICB3aGl0ZQogIGJsYWNrCgogIEBAc2NoZW1hKCJjaGVzcyIpCn0KCm1vZGVsIENoZXNzT3BlbmluZyB7CiAgZWNvICBTdHJpbmcgQGRlZmF1bHQoIiIpCiAgbmFtZSBTdHJpbmcgQGRlZmF1bHQoIiIpCiAgcGduICBTdHJpbmcgQGRlZmF1bHQoIiIpCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0egogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6CgogIEBAaWQoW2VjbywgbmFtZSwgcGduXSkKICBAQHNjaGVtYSgiY2hlc3MiKQp9Cg==",
  "inlineSchemaHash": "883296aec7714dfacd92a16a6de13590a88557968b0bb839a0c4a6e4b0a15f4f",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"ChessPlayer\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"followers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatar\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"twitchUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isStreamer\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastOnline\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"joined\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ChessStatus\",\"default\":\"basic\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChessTitle\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"league\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChessLeague\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"archives\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stats\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChessStats\",\"relationName\":\"ChessPlayerToChessStats\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChessStats\":{\"dbName\":null,\"fields\":[{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChessPlayer\",\"relationName\":\"ChessPlayerToChessStats\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeClass\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ChessTimeClass\",\"default\":\"daily\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"best\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"last\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deviation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"win\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"draw\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loss\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"playerId\",\"timeClass\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChessGame\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pgn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeControl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeClass\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ChessTimeClass\",\"default\":\"daily\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rated\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tcn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"initialSetup\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rules\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ChessVariant\",\"default\":\"chess\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fen\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"whiteAccuracy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blackAccuracy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"whiteUsername\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blackUsername\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"whiteResult\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ChessResult\",\"default\":\"checkmated\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blackResult\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ChessResult\",\"default\":\"checkmated\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"whiteRating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blackRating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChessOpening\":{\"dbName\":null,\"fields\":[{\"name\":\"eco\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pgn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":{\"name\":null,\"fields\":[\"eco\",\"name\",\"pgn\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"ChessStatus\":{\"values\":[{\"name\":\"basic\",\"dbName\":null},{\"name\":\"premium\",\"dbName\":null},{\"name\":\"staff\",\"dbName\":null}],\"dbName\":null},\"ChessLeague\":{\"values\":[{\"name\":\"Wood\",\"dbName\":null},{\"name\":\"Stone\",\"dbName\":null},{\"name\":\"Bronze\",\"dbName\":null},{\"name\":\"Silver\",\"dbName\":null},{\"name\":\"Crystal\",\"dbName\":null},{\"name\":\"Elite\",\"dbName\":null},{\"name\":\"Champion\",\"dbName\":null},{\"name\":\"Legend\",\"dbName\":null}],\"dbName\":null},\"ChessTitle\":{\"values\":[{\"name\":\"GM\",\"dbName\":null},{\"name\":\"WGM\",\"dbName\":null},{\"name\":\"IM\",\"dbName\":null},{\"name\":\"WIM\",\"dbName\":null},{\"name\":\"FM\",\"dbName\":null},{\"name\":\"WFM\",\"dbName\":null},{\"name\":\"CM\",\"dbName\":null},{\"name\":\"WCM\",\"dbName\":null},{\"name\":\"NM\",\"dbName\":null},{\"name\":\"WNM\",\"dbName\":null},{\"name\":\"AGM\",\"dbName\":null},{\"name\":\"AIM\",\"dbName\":null},{\"name\":\"AFM\",\"dbName\":null},{\"name\":\"ACM\",\"dbName\":null}],\"dbName\":null},\"ChessTimeClass\":{\"values\":[{\"name\":\"daily\",\"dbName\":null},{\"name\":\"classical\",\"dbName\":null},{\"name\":\"rapid\",\"dbName\":null},{\"name\":\"blitz\",\"dbName\":null},{\"name\":\"bullet\",\"dbName\":null}],\"dbName\":null},\"ChessResult\":{\"values\":[{\"name\":\"win\",\"dbName\":null},{\"name\":\"fiftymove\",\"dbName\":null},{\"name\":\"agreed\",\"dbName\":null},{\"name\":\"insufficient\",\"dbName\":null},{\"name\":\"repetition\",\"dbName\":null},{\"name\":\"stalemate\",\"dbName\":null},{\"name\":\"timevsinsufficient\",\"dbName\":null},{\"name\":\"checkmated\",\"dbName\":null},{\"name\":\"resigned\",\"dbName\":null},{\"name\":\"timeout\",\"dbName\":null},{\"name\":\"abandoned\",\"dbName\":null},{\"name\":\"bughousepartnerlose\",\"dbName\":null},{\"name\":\"threecheck\",\"dbName\":null},{\"name\":\"kingofthehill\",\"dbName\":null}],\"dbName\":null},\"ChessVariant\":{\"values\":[{\"name\":\"bughouse\",\"dbName\":null},{\"name\":\"chess\",\"dbName\":null},{\"name\":\"chess960\",\"dbName\":null},{\"name\":\"crazyhouse\",\"dbName\":null},{\"name\":\"kingofthehill\",\"dbName\":null},{\"name\":\"oddschess\",\"dbName\":null},{\"name\":\"threecheck\",\"dbName\":null}],\"dbName\":null},\"ChessPiece\":{\"values\":[{\"name\":\"king\",\"dbName\":null},{\"name\":\"queen\",\"dbName\":null},{\"name\":\"rook\",\"dbName\":null},{\"name\":\"bishop\",\"dbName\":null},{\"name\":\"knight\",\"dbName\":null},{\"name\":\"pawn\",\"dbName\":null}],\"dbName\":null},\"ChessSide\":{\"values\":[{\"name\":\"white\",\"dbName\":null},{\"name\":\"black\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    CHESS_POSTGRESQL_URL: typeof globalThis !== 'undefined' && globalThis['CHESS_POSTGRESQL_URL'] || typeof process !== 'undefined' && process.env && process.env.CHESS_POSTGRESQL_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


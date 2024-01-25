Object.defineProperty(exports, '__esModule', { value: true });

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
} = require('./runtime/edge');

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.8.1
 * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
 */
Prisma.prismaVersion = {
  client: '5.8.1',
  engine: '78caf6feeaed953168c64e15a249c3e9a033ebe2',
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
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
  updatedAt: 'updatedAt',
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
  updatedAt: 'updatedAt',
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
  updatedAt: 'updatedAt',
};

exports.Prisma.ChessOpeningScalarFieldEnum = {
  eco: 'eco',
  name: 'name',
  pgn: 'pgn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc',
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive',
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last',
};
exports.ChessStatus = exports.$Enums.ChessStatus = {
  basic: 'basic',
  premium: 'premium',
  staff: 'staff',
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
  ACM: 'ACM',
};

exports.ChessLeague = exports.$Enums.ChessLeague = {
  Wood: 'Wood',
  Stone: 'Stone',
  Bronze: 'Bronze',
  Silver: 'Silver',
  Crystal: 'Crystal',
  Elite: 'Elite',
  Champion: 'Champion',
  Legend: 'Legend',
};

exports.ChessTimeClass = exports.$Enums.ChessTimeClass = {
  daily: 'daily',
  classical: 'classical',
  rapid: 'rapid',
  blitz: 'blitz',
  bullet: 'bullet',
};

exports.ChessVariant = exports.$Enums.ChessVariant = {
  bughouse: 'bughouse',
  chess: 'chess',
  chess960: 'chess960',
  crazyhouse: 'crazyhouse',
  kingofthehill: 'kingofthehill',
  oddschess: 'oddschess',
  threecheck: 'threecheck',
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
  kingofthehill: 'kingofthehill',
};

exports.Prisma.ModelName = {
  ChessPlayer: 'ChessPlayer',
  ChessStats: 'ChessStats',
  ChessGame: 'ChessGame',
  ChessOpening: 'ChessOpening',
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: 'client',
    provider: {
      fromEnvVar: null,
      value: 'prisma-client-js',
    },
    output: {
      value:
        '/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/backend/api/src/generated/prisma/chess/client',
      fromEnvVar: null,
    },
    config: {
      engineType: 'library',
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: 'darwin-arm64',
        native: true,
      },
      {
        fromEnvVar: null,
        value: 'debian-openssl-1.1.x',
      },
    ],
    previewFeatures: ['multiSchema'],
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: '../../../../../.env',
    schemaEnvPath: '../../../../../.env',
  },
  relativePath: '../../../../../prisma/chess',
  clientVersion: '5.8.1',
  engineVersion: '78caf6feeaed953168c64e15a249c3e9a033ebe2',
  datasourceNames: ['db'],
  activeProvider: 'postgresql',
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: 'CHESS_POSTGRESQL_URL',
        value: null,
      },
    },
  },
  inlineSchema:
    'ZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiQ0hFU1NfUE9TVEdSRVNRTF9VUkwiKQogIHNjaGVtYXMgID0gWyJjaGVzcyJdCn0KCmdlbmVyYXRvciBjbGllbnQgewogIHByb3ZpZGVyICAgICAgICA9ICJwcmlzbWEtY2xpZW50LWpzIgogIHByZXZpZXdGZWF0dXJlcyA9IFsibXVsdGlTY2hlbWEiXQogIG91dHB1dCAgICAgICAgICA9ICIuLi8uLi9zcmMvZ2VuZXJhdGVkL3ByaXNtYS9jaGVzcy9jbGllbnQiCiAgYmluYXJ5VGFyZ2V0cyA9IFsibmF0aXZlIiwgImRlYmlhbi1vcGVuc3NsLTEuMS54Il0KfQoKZ2VuZXJhdG9yIGRibWwgewogIHByb3ZpZGVyID0gInByaXNtYS1kYm1sLWdlbmVyYXRvciIKfQoKZ2VuZXJhdG9yIGpzb25TY2hlbWEgewogIHByb3ZpZGVyID0gInByaXNtYS1qc29uLXNjaGVtYS1nZW5lcmF0b3IiCn0KCmdlbmVyYXRvciBuZXN0anNEdG8gewogIHByb3ZpZGVyICAgICA9ICJwcmlzbWEtZ2VuZXJhdG9yLW5lc3Rqcy1kdG8iCiAgb3V0cHV0ICAgICAgID0gIi4uLy4uL3NyYy9nZW5lcmF0ZWQvcHJpc21hL2NoZXNzL2R0byIKICByZUV4cG9ydCA9IHRydWUKICBlbnRpdHlTdWZmaXggPSAiRHRvIgp9CgpnZW5lcmF0b3IgbWFya2Rvd24gewogIHByb3ZpZGVyID0gInByaXNtYS1tYXJrZG93biIKICBvdXRwdXQgICA9ICIuL1JFQURNRS5tZCIKfQoKbW9kZWwgQ2hlc3NQbGF5ZXIgewogIGlkICAgICAgICAgIEludCAgICAgICAgICBAaWQKICB1c2VybmFtZSAgICBTdHJpbmcgICAgICAgQHVuaXF1ZQogIG5hbWUgICAgICAgIFN0cmluZyAgICAgICBAZGVmYXVsdCgiIikKICBmb2xsb3dlcnMgICBJbnQgICAgICAgICAgQGRlZmF1bHQoMCkKICBhdmF0YXIgICAgICBTdHJpbmcgICAgICAgQGRlZmF1bHQoIiIpCiAgbG9jYXRpb24gICAgU3RyaW5nICAgICAgIEBkZWZhdWx0KCIiKQogIGNvdW50cnkgICAgIFN0cmluZyAgICAgICBAZGVmYXVsdCgiIikKICBjb3VudHJ5Q29kZSBTdHJpbmcgICAgICAgQGRlZmF1bHQoIiIpCiAgdHdpdGNoVXJsICAgU3RyaW5nICAgICAgIEBkZWZhdWx0KCIiKQogIGlzU3RyZWFtZXIgIEJvb2xlYW4gICAgICBAZGVmYXVsdChmYWxzZSkKICB2ZXJpZmllZCAgICBCb29sZWFuICAgICAgQGRlZmF1bHQoZmFsc2UpCiAgbGFzdE9ubGluZSAgRGF0ZVRpbWUgICAgIEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHoKICBqb2luZWQgICAgICBEYXRlVGltZSAgICAgQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0egogIHN0YXR1cyAgICAgIENoZXNzU3RhdHVzICBAZGVmYXVsdChiYXNpYykKICB0aXRsZSAgICAgICBDaGVzc1RpdGxlPwogIGxlYWd1ZSAgICAgIENoZXNzTGVhZ3VlPwogIGFyY2hpdmVzICAgIFN0cmluZ1tdICAgICBAZGVmYXVsdChbXSkKCiAgc3RhdHMgQ2hlc3NTdGF0c1tdCgogIGNyZWF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXB0egogIHVwZGF0ZWRBdCBEYXRlVGltZT8gQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQGRiLlRpbWVzdGFtcHR6CgogIEBAc2NoZW1hKCJjaGVzcyIpCn0KCmVudW0gQ2hlc3NTdGF0dXMgewogIGJhc2ljCiAgcHJlbWl1bQogIHN0YWZmCgogIEBAc2NoZW1hKCJjaGVzcyIpCn0KCmVudW0gQ2hlc3NMZWFndWUgewogIFdvb2QKICBTdG9uZQogIEJyb256ZQogIFNpbHZlcgogIENyeXN0YWwKICBFbGl0ZQogIENoYW1waW9uCiAgTGVnZW5kCgogIEBAc2NoZW1hKCJjaGVzcyIpCn0KCmVudW0gQ2hlc3NUaXRsZSB7CiAgR00KICBXR00KICBJTQogIFdJTQogIEZNCiAgV0ZNCiAgQ00KICBXQ00KICBOTQogIFdOTQogIEFHTQogIEFJTQogIEFGTQogIEFDTQoKICBAQHNjaGVtYSgiY2hlc3MiKQp9Cgptb2RlbCBDaGVzc1N0YXRzIHsKICBwbGF5ZXIgICAgQ2hlc3NQbGF5ZXIgICAgQHJlbGF0aW9uKGZpZWxkczogW3BsYXllcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICBwbGF5ZXJJZCAgSW50CiAgdGltZUNsYXNzIENoZXNzVGltZUNsYXNzIEBkZWZhdWx0KGRhaWx5KQogIGJlc3QgICAgICBJbnQgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGxhc3QgICAgICBJbnQgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGRldmlhdGlvbiBJbnQgICAgICAgICAgICBAZGVmYXVsdCgwKQogIHdpbiAgICAgICBJbnQgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGRyYXcgICAgICBJbnQgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGxvc3MgICAgICBJbnQgICAgICAgICAgICBAZGVmYXVsdCgwKQoKICBjcmVhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHoKICB1cGRhdGVkQXQgRGF0ZVRpbWU/IEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0egoKICBAQGlkKFtwbGF5ZXJJZCwgdGltZUNsYXNzXSkKICBAQHNjaGVtYSgiY2hlc3MiKQp9CgplbnVtIENoZXNzVGltZUNsYXNzIHsKICBkYWlseQogIGNsYXNzaWNhbAogIHJhcGlkCiAgYmxpdHoKICBidWxsZXQKCiAgQEBzY2hlbWEoImNoZXNzIikKfQoKbW9kZWwgQ2hlc3NHYW1lIHsKICBpZCAgICAgICAgICAgIFN0cmluZyAgICAgICAgIEBpZAogIHVybCAgICAgICAgICAgU3RyaW5nICAgICAgICAgQGRlZmF1bHQoIiIpCiAgcGduICAgICAgICAgICBTdHJpbmcgICAgICAgICBAZGVmYXVsdCgiIikKICB0aW1lQ29udHJvbCAgIFN0cmluZyAgICAgICAgIEBkZWZhdWx0KCIiKQogIHRpbWVDbGFzcyAgICAgQ2hlc3NUaW1lQ2xhc3MgQGRlZmF1bHQoZGFpbHkpCiAgZW5kVGltZSAgICAgICBEYXRlVGltZSAgICAgICBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6CiAgcmF0ZWQgICAgICAgICBCb29sZWFuICAgICAgICBAZGVmYXVsdChmYWxzZSkKICB0Y24gICAgICAgICAgIFN0cmluZyAgICAgICAgIEBkZWZhdWx0KCIiKQogIGluaXRpYWxTZXR1cCAgU3RyaW5nICAgICAgICAgQGRlZmF1bHQoIiIpCiAgcnVsZXMgICAgICAgICBDaGVzc1ZhcmlhbnQgICBAZGVmYXVsdChjaGVzcykKICBmZW4gICAgICAgICAgIFN0cmluZyAgICAgICAgIEBkZWZhdWx0KCIiKQogIHdoaXRlQWNjdXJhY3kgRmxvYXQgICAgICAgICAgQGRlZmF1bHQoMCkKICBibGFja0FjY3VyYWN5IEZsb2F0ICAgICAgICAgIEBkZWZhdWx0KDApCiAgd2hpdGVVc2VybmFtZSBTdHJpbmcgICAgICAgICBAZGVmYXVsdCgiIikKICBibGFja1VzZXJuYW1lIFN0cmluZyAgICAgICAgIEBkZWZhdWx0KCIiKQogIHdoaXRlUmVzdWx0ICAgQ2hlc3NSZXN1bHQgICAgQGRlZmF1bHQoY2hlY2ttYXRlZCkKICBibGFja1Jlc3VsdCAgIENoZXNzUmVzdWx0ICAgIEBkZWZhdWx0KGNoZWNrbWF0ZWQpCiAgd2hpdGVSYXRpbmcgICBJbnQgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGJsYWNrUmF0aW5nICAgSW50ICAgICAgICAgICAgQGRlZmF1bHQoMCkKICBjcmVhdGVkQXQgICAgIERhdGVUaW1lPyAgICAgIEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wdHoKICB1cGRhdGVkQXQgICAgIERhdGVUaW1lPyAgICAgIEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBkYi5UaW1lc3RhbXB0egoKICBAQHNjaGVtYSgiY2hlc3MiKQp9CgplbnVtIENoZXNzUmVzdWx0IHsKICB3aW4KICBmaWZ0eW1vdmUKICBhZ3JlZWQKICBpbnN1ZmZpY2llbnQKICByZXBldGl0aW9uCiAgc3RhbGVtYXRlCiAgdGltZXZzaW5zdWZmaWNpZW50CiAgY2hlY2ttYXRlZAogIHJlc2lnbmVkCiAgdGltZW91dAogIGFiYW5kb25lZAogIGJ1Z2hvdXNlcGFydG5lcmxvc2UKICB0aHJlZWNoZWNrCiAga2luZ29mdGhlaGlsbAoKICBAQHNjaGVtYSgiY2hlc3MiKQp9CgplbnVtIENoZXNzVmFyaWFudCB7CiAgYnVnaG91c2UKICBjaGVzcwogIGNoZXNzOTYwCiAgY3Jhenlob3VzZQogIGtpbmdvZnRoZWhpbGwKICBvZGRzY2hlc3MKICB0aHJlZWNoZWNrCgogIEBAc2NoZW1hKCJjaGVzcyIpCn0KCmVudW0gQ2hlc3NQaWVjZSB7CiAga2luZwogIHF1ZWVuCiAgcm9vawogIGJpc2hvcAogIGtuaWdodAogIHBhd24KCiAgQEBzY2hlbWEoImNoZXNzIikKfQoKZW51bSBDaGVzc1NpZGUgewogIHdoaXRlCiAgYmxhY2sKCiAgQEBzY2hlbWEoImNoZXNzIikKfQoKbW9kZWwgQ2hlc3NPcGVuaW5nIHsKICBlY28gIFN0cmluZyBAZGVmYXVsdCgiIikKICBuYW1lIFN0cmluZyBAZGVmYXVsdCgiIikKICBwZ24gIFN0cmluZyBAZGVmYXVsdCgiIikKCiAgY3JlYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcHR6CiAgdXBkYXRlZEF0IERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAZGIuVGltZXN0YW1wdHoKCiAgQEBpZChbZWNvLCBuYW1lLCBwZ25dKQogIEBAc2NoZW1hKCJjaGVzcyIpCn0K',
  inlineSchemaHash:
    '123712c846da327353bc5d8281422f281b3bd886d524e817d0d8fd88c499483f',
  noEngine: false,
};
config.dirname = '/';

config.runtimeDataModel = JSON.parse(
  '{"models":{"ChessPlayer":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"followers","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"avatar","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"location","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"countryCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"twitchUrl","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"isStreamer","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"verified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"lastOnline","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"joined","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ChessStatus","default":"basic","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ChessTitle","isGenerated":false,"isUpdatedAt":false},{"name":"league","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ChessLeague","isGenerated":false,"isUpdatedAt":false},{"name":"archives","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"stats","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ChessStats","relationName":"ChessPlayerToChessStats","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ChessStats":{"dbName":null,"fields":[{"name":"player","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ChessPlayer","relationName":"ChessPlayerToChessStats","relationFromFields":["playerId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"playerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"timeClass","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ChessTimeClass","default":"daily","isGenerated":false,"isUpdatedAt":false},{"name":"best","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"last","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"deviation","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"win","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"draw","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"loss","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["playerId","timeClass"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ChessGame":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"pgn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"timeControl","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"timeClass","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ChessTimeClass","default":"daily","isGenerated":false,"isUpdatedAt":false},{"name":"endTime","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"rated","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"tcn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"initialSetup","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"rules","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ChessVariant","default":"chess","isGenerated":false,"isUpdatedAt":false},{"name":"fen","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"whiteAccuracy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"blackAccuracy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"whiteUsername","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"blackUsername","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"whiteResult","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ChessResult","default":"checkmated","isGenerated":false,"isUpdatedAt":false},{"name":"blackResult","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ChessResult","default":"checkmated","isGenerated":false,"isUpdatedAt":false},{"name":"whiteRating","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"blackRating","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ChessOpening":{"dbName":null,"fields":[{"name":"eco","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"pgn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":{"name":null,"fields":["eco","name","pgn"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"ChessStatus":{"values":[{"name":"basic","dbName":null},{"name":"premium","dbName":null},{"name":"staff","dbName":null}],"dbName":null},"ChessLeague":{"values":[{"name":"Wood","dbName":null},{"name":"Stone","dbName":null},{"name":"Bronze","dbName":null},{"name":"Silver","dbName":null},{"name":"Crystal","dbName":null},{"name":"Elite","dbName":null},{"name":"Champion","dbName":null},{"name":"Legend","dbName":null}],"dbName":null},"ChessTitle":{"values":[{"name":"GM","dbName":null},{"name":"WGM","dbName":null},{"name":"IM","dbName":null},{"name":"WIM","dbName":null},{"name":"FM","dbName":null},{"name":"WFM","dbName":null},{"name":"CM","dbName":null},{"name":"WCM","dbName":null},{"name":"NM","dbName":null},{"name":"WNM","dbName":null},{"name":"AGM","dbName":null},{"name":"AIM","dbName":null},{"name":"AFM","dbName":null},{"name":"ACM","dbName":null}],"dbName":null},"ChessTimeClass":{"values":[{"name":"daily","dbName":null},{"name":"classical","dbName":null},{"name":"rapid","dbName":null},{"name":"blitz","dbName":null},{"name":"bullet","dbName":null}],"dbName":null},"ChessResult":{"values":[{"name":"win","dbName":null},{"name":"fiftymove","dbName":null},{"name":"agreed","dbName":null},{"name":"insufficient","dbName":null},{"name":"repetition","dbName":null},{"name":"stalemate","dbName":null},{"name":"timevsinsufficient","dbName":null},{"name":"checkmated","dbName":null},{"name":"resigned","dbName":null},{"name":"timeout","dbName":null},{"name":"abandoned","dbName":null},{"name":"bughousepartnerlose","dbName":null},{"name":"threecheck","dbName":null},{"name":"kingofthehill","dbName":null}],"dbName":null},"ChessVariant":{"values":[{"name":"bughouse","dbName":null},{"name":"chess","dbName":null},{"name":"chess960","dbName":null},{"name":"crazyhouse","dbName":null},{"name":"kingofthehill","dbName":null},{"name":"oddschess","dbName":null},{"name":"threecheck","dbName":null}],"dbName":null},"ChessPiece":{"values":[{"name":"king","dbName":null},{"name":"queen","dbName":null},{"name":"rook","dbName":null},{"name":"bishop","dbName":null},{"name":"knight","dbName":null},{"name":"pawn","dbName":null}],"dbName":null},"ChessSide":{"values":[{"name":"white","dbName":null},{"name":"black","dbName":null}],"dbName":null}},"types":{}}'
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.getQueryEngineWasmModule = undefined;

config.injectableEdgeEnv = () => ({
  parsed: {
    CHESS_POSTGRESQL_URL:
      (typeof globalThis !== 'undefined' &&
        globalThis['CHESS_POSTGRESQL_URL']) ||
      (typeof process !== 'undefined' &&
        process.env &&
        process.env.CHESS_POSTGRESQL_URL) ||
      undefined,
  },
});

if (
  (typeof globalThis !== 'undefined' && globalThis['DEBUG']) ||
  (typeof process !== 'undefined' && process.env && process.env.DEBUG) ||
  undefined
) {
  Debug.enable(
    (typeof globalThis !== 'undefined' && globalThis['DEBUG']) ||
      (typeof process !== 'undefined' && process.env && process.env.DEBUG) ||
      undefined
  );
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
